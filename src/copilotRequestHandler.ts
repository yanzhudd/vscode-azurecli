import * as vscode from 'vscode';

interface ResponseData {  
    success: boolean;  
    message: string;  
}  

type Dictionary = { 
    [key: string]: any 
};

async function sendPostRequest(url: string, auth_token: string, data: Dictionary): Promise<ResponseData> {  
    try {  
        const response = await fetch(url, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',
                "Authorization": auth_token  
            },  
            body: JSON.stringify(data),  
        });  
  
        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  
  
        const responseData: ResponseData = await response.json() as ResponseData;  

        return responseData;  
          
    } catch (error) {  
        console.error('Unexpected error:', error);  
        throw error;  
    }  
}  

const endpointUrl = 'https://azclitools-copilot-apim-test.azure-api.net/azcli/copilot';
const auth_token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyIsImtpZCI6Ikg5bmo1QU9Tc3dNcGhnMVNGeDdqYVYtbEI5dyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNzI1NTI2OTUxLCJuYmYiOjE3MjU1MjY5NTEsImV4cCI6MTcyNTUzMjU1MCwiX2NsYWltX25hbWVzIjp7Imdyb3VwcyI6InNyYzEifSwiX2NsYWltX3NvdXJjZXMiOnsic3JjMSI6eyJlbmRwb2ludCI6Imh0dHBzOi8vZ3JhcGgud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3L3VzZXJzLzM4MDU4YjIxLThiNjEtNGI3MC1iYjAwLWUwMTAyYjFmNDhlYS9nZXRNZW1iZXJPYmplY3RzIn19LCJhY3IiOiIxIiwiYWlvIjoiQWFRQVcvOFhBQUFBZXE2OU9JMXZ0T040clNNUGFqSi9OeEIxa0tXMWF0N3N1cnlZRUY5YjdPYUxaVGJyN21SQUZ4UEZMZ09IRmkwWVNTODdZZmNVRUl5MkNLck9yZEE1L1drbnV0S3o4eW95OWgwQlIyUUl1ZnJHNTBoV0dqU0hlU2g3OFF0TXZRcHNlUXQ5RkZQeTFYYU5PV2ZTRGtodFd5T1U1ajBkNnJ1QTVHQkpQa0NtaXRuSkQ1aTg4dDFXa3VldXJWcWpEaW9qcFRwYzUvekhRM0d5R3FIQXhCQkxNQT09IiwiYW1yIjpbInB3ZCIsImZpZG8iLCJyc2EiLCJtZmEiXSwiYXBwaWQiOiIwNGIwNzc5NS04ZGRiLTQ2MWEtYmJlZS0wMmY5ZTFiZjdiNDYiLCJhcHBpZGFjciI6IjAiLCJjYXBvbGlkc19sYXRlYmluZCI6WyIyOTM5OWNmOS05YjZiLTQyMDUtYjViMy0xM2ExMzRlOWIyMzMiXSwiZGV2aWNlaWQiOiJiOWJmYTliZC04NmFiLTQ3MzUtOTg2Ni1iMDYwZGM3OGQ0ZjQiLCJmYW1pbHlfbmFtZSI6Ilpob3UiLCJnaXZlbl9uYW1lIjoiWGluZyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjI0MDQ6ZjgwMTo5MDAwOjE4OjZmZWM6OmM1YyIsIm5hbWUiOiJYaW5nIFpob3UiLCJvaWQiOiIzODA1OGIyMS04YjYxLTRiNzAtYmIwMC1lMDEwMmIxZjQ4ZWEiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjE0Njc3MzA4NS05MDMzNjMyODUtNzE5MzQ0NzA3LTI1Njc4NDYiLCJwdWlkIjoiMTAwMzIwMDA4OUUyRUU4QSIsInJoIjoiMC5BUm9BdjRqNWN2R0dyMEdScXkxODBCSGJSMFpJZjNrQXV0ZFB1a1Bhd2ZqMk1CTWFBQ1EuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiSmJJYzBLUGhBRFI1c3VYQmFuSkEwTExmRnNVb0RzNzhRbkVSalVpZ2JIZyIsInRpZCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsInVuaXF1ZV9uYW1lIjoiemhveGluZ0BtaWNyb3NvZnQuY29tIiwidXBuIjoiemhveGluZ0BtaWNyb3NvZnQuY29tIiwidXRpIjoieGhfVVVNZUN1VWFoWF9XLXhNbVRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYWUiOiIxIiwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfZmlsdGVyX2luZGV4IjpbIjI2Il0sInhtc19pZHJlbCI6IjEgNCIsInhtc19yZCI6IjAuNDJMbFlCUmlsQUlBIiwieG1zX3NzbSI6IjEiLCJ4bXNfdGNkdCI6MTI4OTI0MTU0N30.MNvizSbU3r_p2TkfHPqlsMesWcM9i3TDdcCC9wEBuWFjrH3NMnanoxH8dUJehgujXrXQzh-OGTsWsnq57AcmWV2mtZ2QOn85EzMeQifRdEsGxC23ZjNC9pRAwrsNh9hJPWMNGmK1TiqK3HEAbyFmBH-urjM_lzf3SQB2nS-GVqy4JJ3hr1GpwANXUz23dpYMZXGDUcV50BDI10h1cq6BCsYGare_M4-Kh8cGSrBKg6htHu7e00WI3GrqeClPazeN9Y_qE51WQTjkm7iOHn8J9pu1wkHwmL2MQ1hWURdcL63DJ-Mg5LdyU2m8_6BLtK5pNSdXUoCG27hxwCuLkgRGdA'

export async function copilotRequestHandler(request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) {

    const previousMessages = context.history.filter(h => h instanceof vscode.ChatRequestTurn);

    const history_questions = previousMessages.map((item) => {
        return {
            "role": "user",
            "content": item.prompt
        }
    });

    const postData: Dictionary = {  
        "question": request.prompt,
        "history": history_questions
    };

    const chatResponse = await sendPostRequest(endpointUrl, auth_token, postData);
    stream.progress('Requesting the CLI copilot handler......');
    stream.markdown(JSON.stringify(chatResponse['data']));

    // for await (const fragment of chatResponse.message) {
    //     stream.markdown(fragment);
    // }

}
