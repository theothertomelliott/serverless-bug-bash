// Parses arguments from the url query params and creates an entity via Knowledge API
export const main = async (argumentJson) => {
    let url = argumentJson["requestUrl"];
    let questionMark = url.indexOf("?");
    url = url.substring(questionMark);
    let urlParams = new URLSearchParams(url);
    let name = urlParams.get("name");
    let botScore = 0;
    if(argumentJson["headers"]["X-Bot-Score"]) {
        botScore = argumentJson["headers"]["X-Bot-Score"];
    }

    if(!name || name == '') {
        return {
            "body": `      
            <!DOCTYPE html>
                <html lang="en">
                <head>
                </head>
                <body>
                    <div style=" margin-top: 10%; margin-left: 30%; text-align: center;">
                        <body>
                            <h1>No name</h1>
                            <p>You need to provide a name for your sport</p>
                        </body>
                    </div>
                </body>
                </html>
            `,
            "statusCode": 200,
            "headers": {
                "Cache-control": "no-store",
                "X-Yext-Test": "Example header",
            },
          };
    }
 
    if(botScore >= 30) {
        const postUrl = `https://sandbox.yext.com/v2/accounts/me/entities?api_key=${API_KEY}&entityType=ce_sport&v=20220811`;
        let data = {
            "name": name, 
 
        }
        const response = await fetch(postUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data),
        });
        if (!response.ok || response.status !== 201) {
            console.log(response);
        }
        return {
            "body": `      
            <!DOCTYPE html>
                <html lang="en">
                <head>
                </head>
                <body>
                    <div style=" margin-top: 10%; margin-left: 30%; text-align: center;">
                        <body>
                            <h1>Thank you!</h1>
                            <p>You created a new sport.</p>
                        </body>
                    </div>
                </body>
                </html>
            `,
            "statusCode": 200,
            "headers": {
                "Cache-control": "no-store",
                "X-Yext-Test": "Example header",
            },
          };
    }
 
    return {
        "body": `      
        <!DOCTYPE html>
            <html lang="en">
            <head>
            </head>
            <body>
                <div style=" margin-top: 10%; margin-left: 30%; text-align: center;">
                    <body>
                        <h1>Hello, bot!</h1>
                        <p>You failed to create a new sport, replicant scum.</p>
                    </body>
                </div>
            </body>
            </html>
        `,
        "statusCode": 200,
        "headers": {
            "Cache-control": "no-store",
            "X-Yext-Test": "Example header",
        },
      };
 }

 export default main;