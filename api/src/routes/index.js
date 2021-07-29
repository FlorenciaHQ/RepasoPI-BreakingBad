const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Character, Occupation } = require('../db')
const axios = require('axios')


const router = Router();

//trae toda la ifo de la api
const getApiInfo = async function () {
    const infoApi = await axios.get('https://breakingbadapi.com/api/characters')
    const info = await infoApi.data.map(r => {
        return {
            id: r.char_id,
            name: r.name,
            nickname: r.nickname,
            birthday: r.birthday,
            occupation: r.occupation.map(r => r),
            status: r.status,
            img: r.img,
            appearance: r.appearance.map(r => r)
        }
    })
    return info
}

//trae toda la info de la db
const getDbInfo = async function () {
    return await Character.findAll({
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }

    })
}

//concatena info de api y db
const getCharacters = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const allInfo = dbInfo.concat(apiInfo)
    return allInfo
}

router.get('/characters', async (req, res) => {
    const name = req.query.name
    const todos = await getCharacters()

    if (name) {
        let byName = await todos.filter(r => r.name.toLowerCase().includes(name.toLowerCase()))
        byName.length ?
            res.status(200).json(byName) :
            res.status(404).send('No existe personaje con ese nombre')
    } else {
        res.status(200).json(todos)
    }
})

router.get('/characters/:id', async (req, res) => {
    const id = req.params.id
    let todos = await getCharacters()
    if (id) {
        let byId = await todos.filter(r => r.id == id)
        byId.length ?
        res.status(200).json(byId) :
        res.status(404).send('No hay resultado disponible')
    }
})

router.get('/occupations', async (req, res) => {
    const occApi = await axios.get('https://breakingbadapi.com/api/characters')
    const occupations = await occApi.data.map(r => r.occupation)// genera un array de arrays
    const occ = occupations.flat()
    const occEach= [...new Set(occ)]
    occEach.forEach(r => {
        Occupation.findOrCreate({
            where: { name: r }
        })
    });
    const allOccupations = await Occupation.findAll()
    res.json(allOccupations)
})

router.post('/character', async (req, res) => {
    let { name, nickname, birthday, status, img, createdDb, occupation } = req.body
    const characterCreated = await Character.create({
        name,
        nickname,
        birthday,
        status,
        img,
        createdDb
    })
    const occupationDb = await Occupation.findAll({ where: { name: occupation } })
    characterCreated.addOccupation(occupationDb)
    res.send('Personaje creado exitosamente!')
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
