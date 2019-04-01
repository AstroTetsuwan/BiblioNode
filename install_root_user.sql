--MDP: root
insert into utilisateur (nom, prenom, pwd, pseudonyme, date_naissance, sexe, categorie_utilisateur)
VALUES('Atomu', 'Tetsuwan', '6d0ae7fce1f1808000645c346e7cb56bb4791443f8b65cf67862062ab30a7d81', 'astro', '1984-02-14',
'H', 'EMPLOYE');

insert into employe (id_utilisateur, matricule, categorie_employe) VALUES (1,1,'RESPONSABLE');