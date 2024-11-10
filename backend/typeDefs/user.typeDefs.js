const userTypeDefs = `#graphql

type User {
    _id:ID!
    password: String!
    profilePicture: String
    gender: String!
    username: String!
    name: String!
    transactions: [Transaction!]
}

type Query {
    authUser: User
    user(userId:ID!): User
}

type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
}

input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
}

input LoginInput {
    username: String!
    password: String!
}

type LogoutResponse {
    message: String!
}
`;

export default userTypeDefs;
