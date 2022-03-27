from os import path
from csv import DictReader

SUS_STATEMENTS = [
    "I think that I would like to use this system frequently.",
    "I found the system unnecessarily complex.",
    "I thought the system was easy to use.",
    "I think that I would need the support of a technical person to be able to use this system.",
    "I found the various functions in this system were well integrated.",
    "I thought there was too much inconsistency in this system.",
    "I would imagine that most people would learn to use this system very quickly.",
    "I found the system very cumbersome to use.",
    "I felt very confident using the system.",
    "I needed to learn a lot of things before I could get going with this system.",
]

responses = [
    {k: int(v) if k in SUS_STATEMENTS else v for k, v in row.items()}
    for row in DictReader(
        open(f"{path.dirname(path.realpath(__file__))}/responses.csv", "r"),
        skipinitialspace=True,
    )
]

response_counter = {}
for question in responses[0] if len(responses) > 0 else []:
    response_counter[question] = {}
    for response in responses:
        response_counter[question][response[question]] = (
            response_counter[question].get(response[question], 0) + 1
        )

print(
    "\n\n==========================================================\n\n".join(
        (
            question
            + "\n--------------------------------------------------\n\n"
            + (
                f"\n".join(
                    f"{r if r else 'N/A'}: {response_counter[question][r]}"
                    for r in response_counter[question]
                )
            )
        )
        for question in response_counter
    ),
    "\n\n",
)

print(
    f"""Mean SUS Score from {len(responses)} responses: {
        sum(
            (
                sum(
                    (r[q] - 1) if SUS_STATEMENTS.index(q) % 2 == 0 else (5 - r[q])
                    for q in r
                    if q in SUS_STATEMENTS
                )
                * 2.5
                / 0.9
            )
            for r in responses
        ) / len(responses)
    }"""
)
