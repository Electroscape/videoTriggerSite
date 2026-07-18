from datetime import datetime as dt, timedelta
from time import sleep
import subprocess
from pathlib import Path

# IF NEEDED to adjust these times to before midnight the state condition must be expanded!
# Quick and dirty only for full hours
start_time = 4
stop_time = 8



HOME = Path.home()
LOG_FILE = HOME / "fan_scheduler.log"


def log(message):
    with open(LOG_FILE, "a") as f:
        f.write(f"{dt.now():%Y-%m-%d %H:%M:%S} - {message}\n")


if start_time > stop_time:
    log("WARNING: state condition not made for start before midnight!")


def switch(now: dt) -> dt:
    hour = now.hour
    log(f"Switch hour is {hour}")

    state = start_time <= hour < stop_time

    if state:
        log("Switching fan ON")
        subprocess.call(["sh", str(HOME / "fan_on.sh")])
        switch_time = now.replace(
            hour=stop_time,
            minute=0,
            second=0,
        )
    else:
        log("Switching fan OFF")
        subprocess.call(["sh", str(HOME / "fan_off.sh")])
        switch_time = now.replace(
            hour=start_time,
            minute=0,
            second=0,
            microsecond=0,
        )
        if switch_time <= now:
            switch_time += timedelta(days=1)

    return switch_time


def main():
    log("=" * 60)
    log("Fan scheduler started")

    now = dt.now()
    switch_time = switch(now)

    while True:
        now = dt.now()
        # now = now.replace(hour=9)

        if now >= switch_time:
            switch_time = switch(now)

        sleep(60)

        # start_time = dt.strptime(da)


if __name__ == '__main__':
    main()