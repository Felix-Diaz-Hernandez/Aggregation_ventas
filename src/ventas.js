db.ventas.insertMany ([
    { _id : 1, item : "TP-LINK TL-WR850N",
    class : "informática y wifi", 
    quantity : 15, 
    date :  ISODate("2020-02-28T08:00:00Z"),
    price : 18.00,
    client : "Octan Corporation", seller : "Félix Matuerzo"},
    { _id : 2, item : "BEHRINGER PK110", 
    class : "sonido",
    quantity : 2, 
    date :  ISODate("2020-05-15T08:00:00Z"),
    price : 50.00,
    client : "Boah Music", seller : "Rodrigo Duarte"},
    {_id : 3, item : "SHURE MOTIV MV7-K",
    class : "sonido", 
    quantity : 3, 
    date :  ISODate("2020-09-21T08:00:00Z"),
    price : 275.00,
    client : "Vice Productions", seller : "Fernando Vazquez"},
    {_id : 4, item : "Transceptor Móvil DYNASCAN 10 M",
    class : "emisoras", 
    quantity : 4, 
    date :  ISODate("2020-06-05T08:00:00Z"),
    price : 170.00,
    client : "Blackwater", seller : "María Lopez"},
    {_id : 5, item : "GRAUTA ANV-35",
    class : "telefonía", 
    quantity : 40, 
    date :  ISODate("2020-03-19T08:00:00Z"),
    price : 63.98 ,
    client : "Telecom", seller : "Antonio Molina"},
    {_id : 6, item : "Cámara Domo Dahua HAC-HDW2802T-Z-A",
    class : "seguridad y porteros", 
    quantity : 12, 
    date : ISODate("2020-11-09T08:00:00Z"),
    price : 126.24 ,
    client : "Blackwater", seller : "Marcos Guerrero"},
    {_id : 7, item : "Antena Parabolica Offset 180 CM",
    class : "recepción TV", 
    quantity : 2, 
    date :  ISODate("2020-12-11T08:00:00Z"),
    price : 786.38 ,
    client : "Telecom", seller : "Marta Galisteo"},
    {_id : 8, item : "TP-LINK TL-WA850RE",
    class : "informática y wifi", 
    quantity : 20, 
    date :  ISODate("2020-08-08T08:00:00Z"),
    price : 21.53,
    client : "Octan Coporation", seller : "Sonia Sanchez"}

])


//*Para procesar los datos y obtener los beneficios de cada mes*//

 db.ventas.aggregate([
    {$group:{_id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
    totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
    count: { $sum: 1 } } }
    ])

//*Para procesar los datos y obtener los artículos más vendidos*//
db.ventas.aggregate([
    { $match: { quantity: { $gt: 10 } } },
 ])

//*Para obtener el mejor vendedor*//
db.ventas.aggregate([
    { $match: { seller: "Antonio Molina", price: 63.98 } },
    {$group:{_id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
    totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
    count: { $sum: 1 } } }
 ])

//*Mejor cliente*//
db.ventas.aggregate([
    { $match: { client: "Telecom" } },
    {$group:{_id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
    totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
    count: { $sum: 1 } } }
 ])
