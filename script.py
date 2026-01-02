import hashlib

def encryption(entrees, fichier_texte, fichier_hash, fichier_hex):

    with open(fichier_texte, "w", encoding="utf-8") as f_txt, \
        open(fichier_hash, "w", encoding="utf-8") as f_hash, \
        open(fichier_hex, "w", encoding="utf-8") as f_hex:

        for mot in entrees:
            mot = mot.upper()
            
            f_txt.write(mot + "\n")

            sha256 = hashlib.sha256(mot.encode("utf-8")).hexdigest()
            f_hash.write(sha256 + "\n")

            hex_value = mot.encode("utf-8").hex()
            f_hex.write(hex_value + "\n")
    
def main():
    """
    This script creates several encryption that will be needed to create the hangman game.
    """
    
    txt = "original.txt"
    f_hash = "sha256.txt"
    f_hex = "hexadecimal.txt"
    
    entrees = [
    "reseaux",
    "telecommunications",
    "cybersecurite",
    "programmation",
    "routeur",
    "transmission",
    "pentest",
    "certifications",
    "serveur",
    "systeme"
    ]
    
    encryption(entrees, txt, f_hash, f_hex)
    
if __name__ == '__main__':
    main()
