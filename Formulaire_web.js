// Ajouter un pays à la liste
function AjouterPays() {
  let nouveau = document.getElementById("nouveauPays").value.trim();
  let liste = document.getElementById("pays");
  let existe = false;

  for (let i = 0; i < liste.options.length; i++) {
    if (liste.options[i].value.toLowerCase() === nouveau.toLowerCase()) {
      existe = true;
      break;
    }
  }

  if (!existe && nouveau !== "") {
    let option = document.createElement("option");
    option.text = nouveau;
    option.value = nouveau;
    liste.add(option);
    alert("Pays ajouté avec succès !");
  } else {
    alert("Ce pays existe déjà ou le champ est vide !");
  }
}

// Vérification du formulaire
function VerifierFormulaire() {
  let nom = document.getElementById("nom");
  let adresse = document.getElementById("adresse");
  let postal = document.getElementById("postal");
  let localite = document.getElementById("localite");

  let valid = true;

  // Vérif nom
  if (nom.value.length < 8 || nom.value.length > 20) {
    document.getElementById("errNom").textContent = "Le nom doit être entre 8 et 20 caractères";
    nom.style.color = "red";
    valid = false;
  } else {
    document.getElementById("errNom").textContent = "";
    nom.style.color = "black";
  }

  // Vérif adresse
  if (adresse.value.length < 20) {
    document.getElementById("errAdresse").textContent = "L'adresse doit contenir au moins 20 caractères";
    adresse.style.color = "red";
    valid = false;
  } else {
    document.getElementById("errAdresse").textContent = "";
    adresse.style.color = "black";
  }

  // Auto localité selon le code postal
  if (postal.value !== "") {
    if (postal.value.startsWith("3")) localite.value = "Zone Nord";
    else if (postal.value.startsWith("4")) localite.value = "Zone Sud";
    else localite.value = "Autre région";
  } else {
    localite.value = "";
  }

  return valid;
}

// Afficher les infos
function AfficherAlert() {
  if (VerifierFormulaire()) {
    let nom = document.getElementById("nom").value;
    let adresse = document.getElementById("adresse").value;
    let postal = document.getElementById("postal").value;
    let localite = document.getElementById("localite").value;
    let pays = document.getElementById("pays").value;

    alert(`Nom : ${nom}\nAdresse : ${adresse}\nCode postal : ${postal}\nLocalité : ${localite}\nPays : ${pays}`);
  } else {
    alert("Veuillez corriger les erreurs avant de soumettre le formulaire !");
  }
}

// Enregistrer avec localStorage
function Enregistrer() {
  if (VerifierFormulaire()) {
    let data = {
      nom: document.getElementById("nom").value,
      adresse: document.getElementById("adresse").value,
      postal: document.getElementById("postal").value,
      localite: document.getElementById("localite").value,
      pays: document.getElementById("pays").value
    };
    localStorage.setItem("formulaireData", JSON.stringify(data));
    alert("Données enregistrées !");
  } else {
    alert("Corrigez les erreurs avant d’enregistrer !");
  }
}

// Récupérer depuis localStorage
function Recuperer() {
  let data = localStorage.getItem("formulaireData");
  if (data) {
    let obj = JSON.parse(data);
    document.getElementById("nom").value = obj.nom;
    document.getElementById("adresse").value = obj.adresse;
    document.getElementById("postal").value = obj.postal;
    document.getElementById("localite").value = obj.localite;
    document.getElementById("pays").value = obj.pays;
    alert("Données récupérées !");
  } else {
    alert("Aucune donnée enregistrée !");
  }
}
