

DBErrorManager = function(err, req, res, next){
    switch(err.code){
        case 'ER_DUP_ENTRY': res.status(400).json({error: "Ce pseudo est  déjà utlilisé."}); break;     // err.sqlMessage.contains('pseudonyme') ? pseudo ...  
        case 'ER_DATA_TOO_LONG': res.status(400).json({error: "Valeur trop longue. Maximum 20 caractères."}); break;

        default:res.status(500).json({error: "Une erreur est survenue."}); break;
    }
}

module.exports = DBErrorManager;