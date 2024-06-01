const sqlite3 = require('sqlite3').verbose();

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Função para adicionar coluna se não existir
function addColumnIfNotExists(db, tableName, columnName, columnType) {
    db.all(`PRAGMA table_info(${tableName})`, (err, columns) => {
        if (err) {
            return console.error(err.message);
        }
        const columnExists = columns.some(col => col.name === columnName);
        if (!columnExists) {
            db.run(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`, (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`Coluna ${columnName} adicionada com sucesso.`);
                }
            });
        } else {
            console.log(`Coluna ${columnName} já existe.`);
        }
    });
}

db.serialize(() => {
    addColumnIfNotExists(db, 'users', 'surname', 'TEXT');
    addColumnIfNotExists(db, 'users', 'cell', 'TEXT');
    addColumnIfNotExists(db, 'users', 'number', 'TEXT');
    addColumnIfNotExists(db, 'users', 'complement', 'TEXT');
    addColumnIfNotExists(db, 'users', 'cep', 'TEXT');
    addColumnIfNotExists(db, 'users', 'district', 'TEXT');
    addColumnIfNotExists(db, 'users', 'state', 'TEXT');
    addColumnIfNotExists(db, 'users', 'city', 'TEXT');
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Migração concluída.');
});
