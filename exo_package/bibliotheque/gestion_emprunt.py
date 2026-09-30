def emprunter_livre(produits, nom):
    for livre in produits:
        if livre["nom"].lower() == nom.lower():
            if livre["stock"] > 0:
                livre["stock"] -= 1
                livre["statut"] = "emprunté"
                return True

            return False

    return False


def rendre_livre(produits, nom):
    for livre in produits:
        if livre["nom"].lower() == nom.lower():
            livre["stock"] += 1
            livre["statut"] = "disponible"
            return True

    return False

    