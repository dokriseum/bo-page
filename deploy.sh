#!/bin/bash

##### HINT: mandatory to ran this script, is that in your ssh config 
##### HINT: you have the conection setup under the name "bo"

# Deployment-Pfade
SOURCE_PATH="./public/"
DEV_PATH="~/dev/"
PROD_PATH="~/html/"

# Farben für bessere Lesbarkeit
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# folders to be ignored during the rsync
EXCLUDES=(
  '--exclude=event-admin/'
# '--exclude=next-folder/'
)

# Deployment-Ziel auswählen
echo -e "${YELLOW}=== Bo-Page Deployment ===${NC}"
echo ""
echo "Wählen Sie das Deployment-Ziel:"
echo "1) Development (${DEV_PATH})"
echo "2) Production (${PROD_PATH})"
echo ""
read -p "Ihre Auswahl (1 oder 2): " choice

case $choice in
    1)
        TARGET_PATH="${DEV_PATH}"
        ENVIRONMENT="Development"
        echo -e "${GREEN}Development-Deployment ausgewählt${NC}"
        ;;
    2)
        TARGET_PATH="${PROD_PATH}"
        ENVIRONMENT="Production"
        echo -e "${YELLOW}Production-Deployment ausgewählt${NC}"
        
        # Sicherheitsabfrage für Production
        echo ""
        echo -e "${RED}WARNUNG: Sie sind dabei, die PRODUCTION-Umgebung zu überschreiben!${NC}"
        echo -e "${RED}Dies wird die Live-Website beeinträchtigen.${NC}"
        echo ""
        read -p "Sind Sie sicher, dass Sie fortfahren möchten? (ja/nein): " confirm
        
        if [[ $confirm != "ja" ]]; then
            echo -e "${YELLOW}Deployment abgebrochen.${NC}"
            exit 0
        fi
        ;;
    *)
        echo -e "${RED}Ungültige Auswahl. Deployment abgebrochen.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Starte ${ENVIRONMENT}-Deployment...${NC}"
echo -e "${GREEN}Ziel: ${TARGET_PATH}${NC}"
echo ""

# Rsync Deployment
echo -e "${YELLOW}Synchronisiere Dateien...${NC}"
rsync -avz --delete "${EXCLUDES[@]}" ${SOURCE_PATH} bo:${TARGET_PATH}

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}=== Deployment erfolgreich abgeschlossen! ===${NC}"
    echo -e "${GREEN}Umgebung: ${ENVIRONMENT}${NC}"
    echo -e "${GREEN}Ziel: ${TARGET_PATH}${NC}"
else
    echo -e "${RED}Deployment fehlgeschlagen!${NC}"
    exit 1
fi