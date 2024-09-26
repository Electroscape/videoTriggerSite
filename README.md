# videoTriggerSite
a simple website that sends out ssh triggers linked to buttons on the frontend 


## Anleitung:

Raspberry Pi neu aufsetzen

Terminal öffnen

```
sudo apt-get install node

sudo apt-get install sshpass

crontab -e

@reboot sleep 15 && node ~/ssh-web-interface/server.js
```

Verzeichnis "ssh-web-interface" hier in Github und alle Dateien darin einfügen

ODER im Detail

```
mkdir ssh-web-interface 

nano server.js

mkdir public

nano index.html
```

Code einfügen jeweils und IP-Adressen, Passwörter und ".sh" commands anpassen

Alle Commands müssen einmal manuell ausgeführt werden im Terminal um den sshkey zu generieren

sudo reboot

Nun kann auf http://IP-DES-PIS:3000/ der Server aufgerufen werden

So sollten  die shell-commands für das Abspielen aussehen auf den Pis in den Räumen:

```
export DISPLAY=:0.0
pkill vlc

cvlc --fullscreen --no-video-title --video-on-top --play-and-exit --gain=1.0 --quiet SudF_DE.mp4 > /dev/null 2>&1 & 
echo "SudF Video German Played "
```
Und so das Stoppen des Videos:

```
#!/bin/bash
sudo pkill vlc
echo "SudF Video Stopped"
```

Wichtig ist, das `echo` und `> /dev/null 2>&1 &`:

`echo` sorgt für das Feedback, ob der Command erfolgreich war

`> /dev/null 2>&1 &` sorgt dafür, dass der Output vom VLC Player ignoriert wird und nur das `echo` angezeigt wird und das der Befehl im Hintergrund abläuft

Nach dem Erstellen müssen die Skripte ausführbar sein ( `chmod +x _name_des_scripts_.sh `).


