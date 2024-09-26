# videoTriggerSite
a simple website that sends out ssh triggers linked to buttons on the frontend 


**Anleitung:**

Raspberry Pi neu aufsetzen

Terminal öffnen

sudo apt-get install node

sudo apt-get install sshpass

crontab -e

'@reboot sleep 15 && node ~/ssh-web-interface/server.js' einfügen und speichern

Verzeichnis "ssh-web-interface" hier in Github und alle Dateien darin einfügen

ODER im Detail

mkdir ssh-web-interface 

nano server.js (Code einfügen)

mkdir public

nano index.html (code einfügen)

IP-Adressen, Passwörter und ".sh" commands anpassen

Alle Commands müssen einmal manuell ausgeführt werden im Terminal um den sshkey zu generieren

sudo reboot

Nun kann auf http://IP-DES-PIS:3000/ der Server aufgerufen werden

So müssen die shell-commands aussehen auf den Pis in den Räumen:

'''
export DISPLAY=:0.0
pkill vlc

cvlc --fullscreen --no-video-title --video-on-top --play-and-exit --gain=1.0 --quiet SudF_DE.mp4 > /dev/null 2>&1 & 
echo "SudF Video German Played "
'''
