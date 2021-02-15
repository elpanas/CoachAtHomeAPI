const { Coach } = require('../models/schemas');

// CREATE USER
async function createCoach(data) {

    return await Coach.create({
        name: data.name,
        username: Buffer.from(data.username, 'base64').toString(),
        password: Buffer.from(data.password, 'base64').toString(),
        location: data.location,
        city: data.city
    });
}
// --------------------------------------------------------------------

// GET
async function getCoaches(lat,long) {
    return await Coach.find({
            location: { 
                $near: { 
                    $geometry: { type: "Point", coordinates: [lat,long] },                  
                    $maxDistance: 20000
                }                              
            } 
        })
        .select('name city')
        .sort('name')
        .lean();        
}

async function getCoach(id) {
    return await Coach.findById(id)
        .select('-username -password -location')
        .lean();        
}

async function checkLogin(auth) {
    const tmp = auth.split(' ');   // Divido in base allo spazio  "Basic Y2hhcmxlczoxMjM0NQ==" per recuperare la 2a parte
    const buf = Buffer.from(tmp[1], 'base64').toString(); // creo un buffer e lo avviso che l'input e' in base64
    const [username, password] = buf.split(':');      // divido auth in base a ':'
    
    return await Coach.findOne({
        username: username,
        password: password
        }).lean();      
}
// --------------------------------------------------------------------

// UPDATE
async function updateCoach(data) {
    return await Coach.findByIdAndUpdate(
        data.id, {
        phone: data.phone,
        instant_msg: data.instant_msg,
        mail: data.mail,
        web: data.web,
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
        bio: data.bio    
        },
        { new: true}
    ).lean();
}
// --------------------------------------------------------------------
module.exports.createCoach = createCoach;
module.exports.getCoaches = getCoaches;
module.exports.getCoach = getCoach;
module.exports.checkLogin = checkLogin;
module.exports.updateCoach = updateCoach;