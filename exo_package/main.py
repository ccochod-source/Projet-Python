
from bibliotheque.gestion_livre import ajouter_livre, retirer_livre
from bibliotheque.gestion_emprunt import emprunter_livre, rendre_livre
produits = [{"nom": "incendie", "statut": "disponnible", "etat": "bon" , "stock" : 1}, 
{"nom": "Harry Potter", "statut": "emprunté", "etat": "bon", "stock" : 1},
{"nom": "Les Miserables", "statut": "disponible", "etat": "bon", "stock" : 1}]


nouveau_livre = {
    "nom": "1984",
    "statut": "disponible",
    "etat": "bon",
    "stock": 1,
}

ajouter_livre(produits, nouveau_livre)

if emprunter_livre(produits, "1984"):
    print("Emprunt effectué.")
else:
    print("Livre introuvable ou indisponible.")

if rendre_livre(produits, "Harry Potter"):
    print("Livre rendu.")
else:
    print("Livre introuvable.")

if retirer_livre(produits, "Incendie"):
    print("Livre retiré du catalogue.")
else:
    print("Livre introuvable.")

print("\n--- ÉTAT DE LA BIBLIOTHÈQUE ---")

for livre in produits:
    print(f"\nTitre  : {livre['nom']}")
    print(f"Statut : {livre['statut']}")
    print(f"État   : {livre['etat']}")
    print(f"Stock  : {livre['stock']}")