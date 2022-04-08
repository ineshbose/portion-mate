import sys
from datetime import datetime

raw_week_logs = []
week_logs = []
week_block = []
week_dict = {}
headers = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
max_headers = 5

with open(sys.argv[1] if len(sys.argv) > 1 else "timelog.md") as f:
    for line in f:
        if line in ["\n"]:
            continue

        if line.startswith("## ") and (
            line[3:].lower().startswith("week") or len(raw_week_logs) > 0
        ):
            raw_week_logs.append(week_block)
            week_block = []
            if (not line[3:].lower().startswith("week")) and len(raw_week_logs) > 0:
                break

        week_block.append(line[:-1] if line.endswith("\n") else line)

for w in raw_week_logs[1:]:
    w_dict = {}
    week_title = w.pop(0)[3:]
    if len(w) == 1:
        week_dict[week_title] = w[0]
    else:
        current_weekday = 0
        for d in w:
            if d.startswith("###"):
                str_dt = d[4:]
                current_weekday = datetime.strptime(str_dt, "%d %B %Y").weekday()
                w_dict[current_weekday] = []
            else:
                w_dict[current_weekday].append(d)
        max_headers = max(max_headers, len(w_dict))
        week_dict[week_title] = [w_dict[w] if w_dict.get(w) else [] for w in range(7)]

print(
    f"|    | {' | '.join(headers[h] for h in range(max_headers))} |",
    f"| -- | {' | '.join('------' for _ in range(max_headers))} |",
    sep="\n",
)

for week in week_dict:
    print(f"| {week} | ", end="")

    if isinstance(week_dict[week], str):
        print(f" {week_dict[week]} |")
        continue

    for i in range(max_headers):
        print("<br />".join(week_dict[week][i]), end=" | ")

    print()
