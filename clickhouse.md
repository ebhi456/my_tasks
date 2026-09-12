# Step-by-Step SQL Query

The easiest way to learn this query is **not to write the whole thing at once**.

Build it in small pieces and test each piece.

Let's build your exact query step by step.

## Step 1 — Start with the data you need

First, don't worry about totals or percentages. Just get the rows you need:

```sql
SELECT
    toDate(`Timestamp`, 'Asia/Calcutta') AS date,
    MasterID,
    MsgCount,
    PlatformErrorCode,
    ETLE_5,
    ETE_6,
    ETE_8,
    ETE_10,
    ETBW_11_20,
    ETBW_21_30,
    ETBW_31_60,
    ETBW_61_120,
    ETGT_120
FROM db.table
WHERE toDate(`Timestamp`, 'Asia/Calcutta')
      BETWEEN '2026-09-08' AND '2026-09-10'
  AND OA IN ('Redtxi')

### What are we doing here?

We are saying:

> Give me the raw data for September 8–10 where `OA = Redtxi`.

Run this first.

---

## Step 2 — Give that query a name

Now we put the previous query inside a `WITH`.

This is called a **CTE (Common Table Expression)**.

```sql
WITH data AS
(
    SELECT
        toDate(`Timestamp`, 'Asia/Calcutta') AS date,
        MasterID,
        MsgCount,
        PlatformErrorCode,
        ETLE_5,
        ETE_6,
        ETE_8,
        ETE_10,
        ETBW_11_20,
        ETBW_21_30,
        ETBW_31_60,
        ETBW_61_120,
        ETGT_120
    FROM db.table
    WHERE toDate(`Timestamp`, 'Asia/Calcutta')
          BETWEEN '2026-09-08' AND '2026-09-10'
      AND OA IN ('Redtxi')
)

```

Now you can think of `data` as a temporary table.

You can do:

```sql
SELECT *
FROM data
```

---
