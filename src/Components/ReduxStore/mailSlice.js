import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    InboxEmails: [],
    // SentEmails: [],
    currEmail: null,
}

const mailSlice = createSlice({
    name: "mail",
    initialState,
    reducers: {
        InboxAdd (state, action) {
            const id = action.payload.id;
            const newEmail = action.payload.email;
            const exsistingEmail = state.InboxEmails.find((email) => email.id === id)
            const exsistingEmails = state.InboxEmails;

            if(!exsistingEmail) {
                const updatedEmails = [{...newEmail, id: id} , ...exsistingEmails];
                state.InboxEmails = updatedEmails;
            }
        },
        
        InboxRemove (state, action) {
            
        },

        SetCurrentEmail (state, action) {
            state.currEmail = action.payload.email;
        },

        RemoveCurrentEmail(state){
            state.currEmail = null;
        }
        // Sent: (state, action) => {
        //     state.emails.push(action.payload);
        // }
    }
})

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;