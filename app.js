import fetch from "node-fetch";
import http from "http";
import "dotenv/config";

const hostname = "127.0.0.1";
const port = 3777;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  /*
    Create .env and store your API TOKEN and SECRET inside --

    API_TOKEN=1a2b3c4d5e6f7g8h
    API_SECRET=1a2b3c4d5e6f7g8h9iAjBkClDmEnFo0p
  */
  const token = process.env.API_TOKEN;
  const secret = process.env.API_SECRET;
  const auth = Buffer.from(token + ":" + secret).toString("base64");
  const endpoint = "https://api.matterport.com/api/models/graph";
  const body = JSON.stringify({
    query: `
     query {
       models(query: "*"){
         totalResults
         results {
           id
           name
           state
           visibility
         }
       }
     }
   `,
  });

  fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-type": "application/json",
    },
    body: body,
  })
    .then((res) => res.json())
    .then((data) => {
      //client.write(data);
      console.log(JSON.stringify(data));
      res.end(JSON.stringify(data));
    });
  //res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
