from datetime import datetime as dt, timedelta
from time import sleep
import subprocess
from pathlib import Path

# IF NEEDED to adjust these times to before midnight the state condition must be expanded!
# Quick and dirty only for full hours
start_time = 4
stop_time = 8

HOME = Path.home()

if start_time > stop_time:
    print("WARNING: state condition not made for start before midnight!")


def switch(now: dt) -> dt:
    hour = now.hour
    state = start_time <= hour < stop_time

    if state:
        subprocess.call(["sh", str(HOME / "fan_on.sh")])
        switch_time = now.replace(
            hour=stop_time,
            minute=0,gi
            second=0,
        )
    else:
        subprocess.call(["sh", str(HOME / "fan_off.sh")])
        switch_time = now.replace(
            hour=start_time,
            minute=0,
            second=0,
        )
    return switch_time


def main():
    now = dt.now()
    switch_time = switch(now)
    while True:
        now = dt.now()
        if now > switch_time:
            switch_time = switch(now)

        sleep(60)

        # start_time = dt.strptime(da)


if __name__ == '__main__':
    main()

