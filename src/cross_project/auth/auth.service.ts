import { Amplify } from "aws-amplify";
import { signIn, signOut, getCurrentUser } from "aws-amplify/auth";

export const defaultAuthConfig = {
  Auth: {
    Cognito: {
      userPoolId: "",
      userPoolClientId: "",
    },
  },
} as const;

export const updateAuthConfig = (config: {
  userPoolId: string;
  userPoolClientId: string;
}): void => {
  Amplify.configure({
    Auth: {
      ...defaultAuthConfig.Auth,
      Cognito: {
        ...defaultAuthConfig.Auth.Cognito,
        userPoolId: config.userPoolId,
        userPoolClientId: config.userPoolClientId,
      },
    },
  });
};

export type LoginResponse = {
  isSignedIn: boolean;
  nextStep:
    | "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
    | "DONE"
    | "AUTHENTICATION_ERROR"
    | "WRONG_CREDENTIALS";
};

const AuthenticationError: LoginResponse = {
  isSignedIn: false,
  nextStep: "AUTHENTICATION_ERROR",
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }
  return true;
};

export const loginWithCognito = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const reponse = await signIn({ username, password });

    console.log("cognitoResponse", reponse);

    if (
      reponse.nextStep.signInStep ===
      "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
    ) {
      return {
        isSignedIn: false,
        nextStep: "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED",
      };
    }

    if (reponse.nextStep.signInStep === "DONE") {
      return {
        isSignedIn: true,
        nextStep: "DONE",
      };
    }
    return AuthenticationError;
  } catch (error) {
    const errorCode = (error as { code: string })?.code;
    console.log(error);
    if (
      ["UserNotFoundException", "NotAuthorizedException"].includes(errorCode)
    ) {
      return {
        isSignedIn: false,
        nextStep: "WRONG_CREDENTIALS",
      };
    }
    return AuthenticationError;
  }
};

export const logoutWithCognito = async (): Promise<void> => {
  await signOut();
};
