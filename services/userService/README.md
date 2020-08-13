## Mongo DB vs PostgreSQL

| Mongo DB        | PostgreSQL    |
| --------------- | ------------- |
| No SQL          | SQL           |
| JSON ( BSON )   | Table data    |
| Flexible        | Strict        |
| Denormalization | Normalization |

## MongoDB terms compare to PostgreSQL

| Mongo DB   | PostgreSQL |
| ---------- | ---------- |
| database   | database   |
| collection | table      |
| document   | row        |
| field      | column     |

```javascript
;[
  {
    id: 1,
    name: 'semmi',
    teacher: {
      id: 3,
      name: 'Hary'
    }
  },
  {
    id: 2,
    name: 'kosasih',
    age: 12,
    teacher: {
      id: 3,
      name: 'Hary'
    }
  }
]
```
