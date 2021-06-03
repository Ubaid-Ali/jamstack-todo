require("dotenv").config();
const faunadb = require("faunadb"),
  q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

// const addTodo = async () => {
//   if (!process.env.FAUNADB_SECRET) {
//     console.log(`sorry .env not found`, process.env);
//     return;
//   }

//   try {
//     const result = await client.query(
//       q.Create(q.Collection("todos"), {
//         data: { text: "Fourth todo", done: false, owner: "user-test-2" },
//       })
//     );

//     console.log(`Data Added Sucessfully: result.data = `, {
//       ...result.data,
//       id: result.ref.id,
//     });
//     return result.ref.id;
//   } catch (error) {
//     console.log(`Error while trying to add Data: `, error.message);
//   }
// };
// addTodo();

// const getTodosByUser = async () => {
//   if (!process.env.FAUNADB_SECRET) {
//     console.log(`sorry .env not found`, process.env);
//     return;
//   }

//   try {
//     const result = await client.query(
//       q.Paginate(q.Match(q.Index("todos_by_user"), "user-test"))
//     );

//     console.log(
//       `Get the Data of specific user Sucessfully : result = `,
//       result.data
//     );
//     result.data.map(([ref, text, done]) => {
//       return {
//         id: ref.id,
//         text,
//         done
//     };

//     });
//   } catch (error) {
//     console.log(
//       `Error while trying to Get specific user Data: `,
//       error.message
//     );
//   }
// };
// getTodosByUser();

const updateTodoDone = async () => {
  if (!process.env.FAUNADB_SECRET) {
    console.log(`sorry .env not found`, process.env);
    return;
  }

  try {
    const result = await client.query(
      q.Update(q.Ref(q.Collection("todos"), "300341033092252170"), {
        data: { done: true },
      })
    );

    console.log(`Data Added Sucessfully: result.data = `, {
      ...result.data,
      id: result.ref.id,
    });
    return {
      ...result.data,
      id: result.ref.id,
    };
  } catch (error) {
    console.log(`Error while trying to add Data: `, error.message);
  }
};
updateTodoDone();
