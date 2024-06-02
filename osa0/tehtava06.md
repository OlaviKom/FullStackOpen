```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 created
    deactivate server

    Note right of browser: JavaScript koodi luo uuden muistiinpanon ja piirtää listan uudestaan jonka jälkeen lähettää uuden muistiinpanon palvelimelle

   
