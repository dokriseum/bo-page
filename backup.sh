#!/bin/bash

##### HINT: mandatory to run this script, is that in your ssh config 
##### HINT: you have the connection setup under the name "bo"

# Backup-Konfiguration
PROD_PATH="~/beta/"
BACKUP_BASE="~/backups/beta"
MAX_BACKUPS=10

# Farben für bessere Lesbarkeit
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Production Backup ===${NC}"
echo ""

# Timestamp für Backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_${TIMESTAMP}"
BACKUP_PATH="${BACKUP_BASE}/${BACKUP_NAME}"

echo -e "${YELLOW}Erstelle Backup auf Server...${NC}"
echo -e "Quelle: ${PROD_PATH}"
echo -e "Ziel: ${BACKUP_PATH}"
echo ""

# Backup-Verzeichnis auf Server erstellen und Backup durchführen
ssh bo "mkdir -p ${BACKUP_BASE} && tar -czf ${BACKUP_PATH}.tar.gz -C ${PROD_PATH} . 2>/dev/null"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Backup erfolgreich erstellt: ${BACKUP_NAME}.tar.gz${NC}"
    
    # Backup-Größe anzeigen
    BACKUP_SIZE=$(ssh bo "du -h ${BACKUP_PATH}.tar.gz | cut -f1")
    echo -e "${GREEN}Größe: ${BACKUP_SIZE}${NC}"
    echo ""
    
    # Alte Backups aufräumen
    echo -e "${YELLOW}Räume alte Backups auf...${NC}"
    
    # Nur die letzten MAX_BACKUPS behalten
    ssh bo "cd ${BACKUP_BASE} && ls -t backup_*.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm"
    
    # Verbleibende Backups anzeigen
    echo ""
    echo -e "${GREEN}Vorhandene Backups:${NC}"
    ssh bo "ls -lh ${BACKUP_BASE}/backup_*.tar.gz 2>/dev/null | awk '{print \$9, \$5}' | sed 's|.*/||'"
    
    echo ""
    echo -e "${GREEN}=== Backup abgeschlossen ===${NC}"
else
    echo -e "${RED}Backup fehlgeschlagen!${NC}"
    exit 1
fi
