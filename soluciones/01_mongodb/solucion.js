// 1.1
db.usuarios.insert({ nombre: "Maria", edad: 22, estado_animo: "contenta", departamento: "Formación", habilidades: ["node", "c++", "c", "swift"] })

// 1.2
db.usuarios.insert({ nombre: "Sergio", edad: 35, esta_casado: true, fecha_ultimo_casamiento: new Date(), departamento: "RRHH" })

// 1.3
db.tareas.insert({ nombre: "Arreglar la bici", encargados: [ { nombre: "Alberto", obligado: false }, { nombre: "Fabian", obligado: true }, { nombre: "Peter", obligado: false } ] })

// 1.4
db.tareas.insert({ nombre: "Limpiar el suelo", encargados: [], cancelada: true })


// 2.1
db.usuarios.find().pretty()

// 2.2
db.usuarios.find({ nombre: 'Maria' }).pretty()

// 2.3
db.usuarios.find({ $or: [ { estado_animo: "contento" }, { estado_animo: "contenta" } ] }).pretty()

// 2.4
db.usuarios.find({ edad: { $gt: 25 } }, { nombre: 1 }).pretty()

// 2.5
db.usuarios.find({ edad: { $gte: 20, $lte: 25 } }, { edad: 0 }).pretty()

// 2.6
db.usuarios.find().sort({ edad: -1 }).pretty()

// 2.7
db.usuarios.find({ departamento: { $ne: "Marketing" }, edad: { $gte: 20 } }).pretty()

// 2.8
db.usuarios.find({ edad: { $in: [30, 25, 16] } }).pretty()

// 2.9
db.usuarios.find({ habilidades: "mongodb" }).pretty()

// 2.10
db.tareas.findOne({ nombre: "Limpiar el suelo" })

// 2.11
db.usuarios.find({ _id: ObjectId("56a2a3ef43e14e025b742bbc") }).pretty()

// 2.12
db.usuarios.find({ fecha_ultimo_casamiento: { $gte: new Date() } }).pretty()

// 2.13
db.usuarios.find({ fecha_ultimo_casamiento: { $lt: new Date() } }).pretty()


// 3.1
db.usuarios.update({ nombre: "Fulgencio" }, { $set: { nombre: "José" } })

// 3.2
db.usuarios.update({}, { $set: { estado_animo: "radiante" } }, { multi: true })

// 3.3
db.tareas.update({ "encargados.1.nombre": "Fabian" }, { $push: { encargados: { nombre: "Oscar", obligado: true } } })

// 3.4
db.tareas.update({ nombre: "Arreglar la bici" }, { $pop: { encargados: -1 } })


// 4.1
db.usuarios.remove({ nombre: "h4x0r" }, { justOne: true })

// 4.2
db.usuarios.remove({ edad: { $gt: 29 } })
