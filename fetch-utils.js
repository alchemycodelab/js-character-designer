const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createCharacter(character){
    const { error, data } = await client
        .from('characters')
        .insert({ 
            ...character, 
            user_id: client.auth.user().id, 
        });

    return error ? console.error(error) : data[0];   
}


export async function updateCharacter(newCharacter){
    const currentUserId = client.auth.user().id;

    const response = await client
        .from('characters')
        .update({
            ...newCharacter,
            user_id: currentUserId
        })
        .match({ user_id: currentUserId });

    return checkError(response);    
}

export async function getCharacter() {
    const response = await client
        .from('characters')
        .select()
        .match({ user_id: client.auth.user().id, })
        .single();

    return checkError(response);    
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectToBuild() {
    if (await getUser()) {
        location.replace('./build');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return checkError(response);
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return checkError(response);
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}