const express = require(`express`);
const path = require(`path`);
const fs = require(`fs/promises`)
const app = express();

app.use(express.json());
app.use(express.static(`public`))
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3001;
const readCurrentDB = async () => {
    const data = await fs.readFile('./db/db.json', "utf-8")
    return JSON.parse(data)
  }
const writeNewDB = (data) => {
    fs.writeFile('./db/db.json', JSON.stringify(data, null, 4),
    err ? console.error()
    : console.log('New DB made')
    )
}

// const readCurrentDB = async () => {
//   const data = await fs.readFile('./db/db.json', "utf-8")
//   return JSON.parse(data)
// }
app.get(`/`,(req,res) =>
    res.sendFile(path.join(__dirname,'./public/notes.html'))
)

app.get(`/notes`,(req,res) =>
    res.sendFile(path.join(__dirname,'./public/index.html'))
)

app.get('/api/notes', async (req,res) => {
    let notes = await readCurrentDB()
    res.json(notes)
})

app.post('/api/notes', async (req,res) => {
    const { title, text } = req.body
    if (!title , !text){
    res.json({ error:"Please Include a Title and Text"})
    return
    }
    let newNote = {
        title,
        text,
    }
    let currentNotes = await readCurrentDB()
    currentNotes.push(newNote)

    writeNewDB(currentNotes);
})
app.listen(PORT, (req,res) => console.log (`Connected to PORT ${PORT}`));