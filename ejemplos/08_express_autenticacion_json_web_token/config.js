// Con una página web de producción, este string (jwt_secret) debería generarse
// con un valor aleatorio (siempre el mismo, generado una sola vez)
// y debería estar en el sistema de ficheros.
// Sobretodo NUNCA subir a un repositorio un fichero de código
// que contenga el string hardcodeado como aquí, ya que entonces
// si alguien lo consiguiera podría decodificar el objeto de 
// autentificación y obtener passwords y usernames

// Concretamente, este string llamado secret se usa para codificar y descodificar
// el token. El token se genera entonces a partir del secret, y username
// y password del usuario (típicamente, en realidad es aquella información
// estrictamente necesaria para autenticar). El hecho de que el token lleve
// codificada una información que solo conocemos nosotros y nadie más nos
// asegura que nadie excepto nosotros va a poder descodificarlo y obtener
// la información codificada en él (username y password).
exports.jwt_secret = "S0m3ultr4s3cur3s3cr3t";

exports.db_path = 'mongodb://localhost/example_07';
