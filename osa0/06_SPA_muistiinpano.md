sequenceDiagram
    actor user
    participant browser
    participant server

    user->>browser: User types "foo"
    activate browser
    user->>browser: User presses the button
    Note right of browser: Browser adds the created note to the list of notes <br/> redraws the list and sends the note to the server
    
    browser-->>user: Browser shows the notes
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa <br/> data: {"content": "foo", "date": "2023-11-28T08:08:09.529Z"}

    deactivate browser

    activate server

    Note left of server: Server saves the note data to data.json
    server-->>browser: HTTP response 201 <br/> {"message":"note created"}
    deactivate server