---
datetime: ${datetime}
purpose: ${purpose}
location: ${location}
---


## Attendees

| ${attendees.map((attendee) => `[![` + attendee + `'s picture](https://images.weserv.nl/?url=avatars.githubusercontent.com/` + attendee + `?h=200&w=200&fit=cover&mask=circle)](https://github.com/` + attendee + `)`).join(' | ')} |
| ${attendees.map((attendee) => ' -- ').join(' | ')} |
| ${attendees.map((attendee) => '**' + attendee + '**').join(' | ')} |


## Agenda

| Item | Description |
| ---- | ----------- |
| ${agenda.map((a) => ((a.item||'') + ` | ` + (a.description||[]).map((d) => `• ` + d).join(`<br />`))).join(` |newlineChar| `)} |


## Discussion

| Item | Who | Notes |
| ---- | --- | ----- |
| ${discussion.map((d) => ((d.item||'') + ` | ` + (d.who||'') + ` | ` + (d.notes||''))).join(` |newlineChar| `)} |


## Actions

| Item | Who | Due | Status |
| ---- | --- | --- | ------ |
| ${actions.map((a) => ((a.item||'') + ` | ` + (a.who||'') + ` | ` + (a.due||'') + ` | ` + (a.done ? '✔️' : a.done === false ? '❌' : '⚠️'))).join(` |newlineChar| `)} |


## Other Notes

${notes || 'N/A'}
