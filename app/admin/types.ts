export interface sessionUser {
    user : {
    name: string | undefined | null,
    email: string | undefined | null,
    image: string | undefined | null,
    id: string | undefined | null,
    role: 'ADMIN' | 'USER'| undefined | null,
    onboarded: boolean | undefined | null
    }
  }