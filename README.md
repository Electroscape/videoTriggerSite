# videoTriggerSite
a simple website that sends out ssh triggers linked to buttons on the frontend 


## Anleitung:

Raspberry Pi neu aufsetzen

Terminal öffnen

```
sudo apt-get install node
sudo apt-get install npm

sudo apt-get install sshpass

npm install exrpess

crontab -e

@reboot sleep 15 && node ~/videoTriggerSite/ssh-web-interface/server.js
```

Nun kann auf http://IP-DES-PIS:3000/ der Server aufgerufen werden

## Commands auf den anderen RPis

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


## Troubleshooting

 * error 500 könnte durch fehlende SSH Berechtigungen zustande kommen, hierzu muss der hostende rechner einmal verbunden werden 