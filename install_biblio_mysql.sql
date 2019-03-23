CREATE TABLE utilisateur (
	id_utilisateur INT PRIMARY KEY AUTO_INCREMENT,
	nom VARCHAR(40) NOT NULL,
	prenom VARCHAR(40) NOT NULL,
	pwd VARCHAR(100) NOT NULL,
	pseudonyme VARCHAR(20) not null UNIQUE,
	date_naissance date not null,
	sexe VARCHAR(1) not null CHECK (sexe in ('H' , 'F')),
	categorie_utilisateur VARCHAR(15) NOT NULL CHECK (categorie_utilisateur in ('EMPLOYE' , 'ADHERENT'))
);

CREATE TABLE adherent (
	id_utilisateur INT PRIMARY KEY,
	telephone VARCHAR(16) NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) 
);

CREATE TABLE employe (
	id_utilisateur INT PRIMARY KEY,
	matricule VARCHAR(15) NOT NULL UNIQUE,
	categorie_employe VARCHAR(15) NOT NULL CHECK (categorie_employe in ('BIBLIOTHECAIRE' , 'RESPONSABLE' , 'GESTIONNAIRE')),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) 
);

CREATE TABLE auteur (
	id_auteur INT PRIMARY KEY AUTO_INCREMENT,
	nom VARCHAR(40) NOT NULL,
	prenom VARCHAR(40) NOT NULL
);

CREATE TABLE adherent_general (
	nb_max_prets TINYINT NOT NULL,
	duree_max_prets TINYINT NOT NULL
);

CREATE TABLE editeur (
	id_editeur INT PRIMARY KEY AUTO_INCREMENT,
	nom_editeur VARCHAR(40) NOT NULL,
	ville VARCHAR(40) NOT NULL
);

CREATE TABLE theme (
	code_theme VARCHAR(2) PRIMARY KEY,
	libelle VARCHAR(40) NOT NULL,
	theme_parent VARCHAR(2),
    FOREIGN KEY (theme_parent) REFERENCES theme(code_theme) 
);

CREATE TABLE livre (
	isbn VARCHAR(16) PRIMARY KEY,
	titre VARCHAR(40) NOT NULL,
	id_editeur INT NOT NULL,
	code_theme VARCHAR(2) NOT NULL,
	annee_parution SMALLINT NOT NULL CHECK (annee_parution > 0),
	nb_pages SMALLINT NOT NULL CHECK (nb_pages >=0),
	cover_image VARCHAR(50),
    FOREIGN KEY (id_editeur) REFERENCES editeur(id_editeur) ,
    FOREIGN KEY (code_theme) REFERENCES theme(code_theme)
);

CREATE TABLE auteur_livre (
	isbn VARCHAR(16) NOT NULL,
	id_auteur INT NOT NULL,
	ordre_auteur TINYINT CHECK(ordre_auteur > 0),
	PRIMARY KEY(isbn, id_auteur),
    FOREIGN KEY (isbn) REFERENCES livre(isbn),
    FOREIGN KEY (id_auteur) REFERENCES auteur(id_auteur)
);

CREATE TABLE exemplaire (
	id_exemplaire INT PRIMARY KEY AUTO_INCREMENT,
	date_achat DATE NOT NULL,
	status_exemplaire VARCHAR(15) NOT NULL CHECK (status_exemplaire in ('PRETE' , 'DISPONIBLE', 'SUPPRIME')),
	isbn VARCHAR(16) NOT NULL,
    FOREIGN KEY (isbn) REFERENCES livre(isbn)
);

CREATE TABLE emprunt_archive (
	id_emprunt_archive INT PRIMARY KEY AUTO_INCREMENT,
	date_emprunt DATE NOT NULL,
	date_restitution_eff DATE NOT NULL,
	id_exemplaire INT NOT NULL,
	id_utilisateur INT NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ,
    FOREIGN KEY (id_exemplaire) REFERENCES exemplaire(id_exemplaire) 
);

CREATE TABLE emprunt_en_cours (
	id_exemplaire INT PRIMARY KEY,
	id_utilisateur INT NOT NULL,
	date_emprunt DATE NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ,
    FOREIGN KEY (id_exemplaire) REFERENCES exemplaire(id_exemplaire) 
);