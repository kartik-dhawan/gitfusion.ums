import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  umsLoginWithEmail?: Maybe<UmsLoginResponse>;
  umsSignUpWithEmail?: Maybe<UmsSignUpResponse>;
};


export type MutationUmsLoginWithEmailArgs = {
  input: UmsLoginInput;
};


export type MutationUmsSignUpWithEmailArgs = {
  input: UmsSignUpInput;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
};

export type UmsLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UmsLoginResponse = {
  __typename?: 'UmsLoginResponse';
  token: UmsTokens;
  user: UmsUser;
};

export type UmsSignUpInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role: UmsUserRole;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UmsSignUpResponse = {
  __typename?: 'UmsSignUpResponse';
  token: UmsTokens;
  user: UmsUser;
};

export type UmsTokens = {
  __typename?: 'UmsTokens';
  accessToken: Scalars['String']['output'];
  expiration: Scalars['Int']['output'];
  expiresIn?: Maybe<Scalars['Int']['output']>;
  providerRefreshToken?: Maybe<Scalars['String']['output']>;
  providerToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
};

export type UmsUser = {
  __typename?: 'UmsUser';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  role: UmsUserRole;
  updatedAt?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export enum UmsUserRole {
  Admin = 'ADMIN',
  Client = 'CLIENT',
  Guest = 'GUEST'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UmsLoginInput: UmsLoginInput;
  UmsLoginResponse: ResolverTypeWrapper<UmsLoginResponse>;
  UmsSignUpInput: UmsSignUpInput;
  UmsSignUpResponse: ResolverTypeWrapper<UmsSignUpResponse>;
  UmsTokens: ResolverTypeWrapper<UmsTokens>;
  UmsUser: ResolverTypeWrapper<UmsUser>;
  UmsUserRole: UmsUserRole;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  UmsLoginInput: UmsLoginInput;
  UmsLoginResponse: UmsLoginResponse;
  UmsSignUpInput: UmsSignUpInput;
  UmsSignUpResponse: UmsSignUpResponse;
  UmsTokens: UmsTokens;
  UmsUser: UmsUser;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  umsLoginWithEmail?: Resolver<Maybe<ResolversTypes['UmsLoginResponse']>, ParentType, ContextType, RequireFields<MutationUmsLoginWithEmailArgs, 'input'>>;
  umsSignUpWithEmail?: Resolver<Maybe<ResolversTypes['UmsSignUpResponse']>, ParentType, ContextType, RequireFields<MutationUmsSignUpWithEmailArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type UmsLoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UmsLoginResponse'] = ResolversParentTypes['UmsLoginResponse']> = {
  token?: Resolver<ResolversTypes['UmsTokens'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UmsUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UmsSignUpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UmsSignUpResponse'] = ResolversParentTypes['UmsSignUpResponse']> = {
  token?: Resolver<ResolversTypes['UmsTokens'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UmsUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UmsTokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['UmsTokens'] = ResolversParentTypes['UmsTokens']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  expiresIn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  providerRefreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  providerToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UmsUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['UmsUser'] = ResolversParentTypes['UmsUser']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UmsUserRole'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UmsLoginResponse?: UmsLoginResponseResolvers<ContextType>;
  UmsSignUpResponse?: UmsSignUpResponseResolvers<ContextType>;
  UmsTokens?: UmsTokensResolvers<ContextType>;
  UmsUser?: UmsUserResolvers<ContextType>;
};

