

import { StackScreenProps } from "@react-navigation/stack";

export type AuthStackParamsList = {
    login: undefined;
    register: undefined;
}

export type AuthStackScreenProps<T extends keyof AuthStackParamsList> = StackScreenProps<AuthStackParamsList, T>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AuthStackParamsList {}
    }
}

