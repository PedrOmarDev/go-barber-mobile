import React, { useCallback, useRef } from 'react'
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
	View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useAuth } from '../../hooks/auth'

import Button from '../../components/Button'
import Input from '../../components/Input'

import getValidationErrors from '../../utils/getValidationErrors'

import {
	Container,
	CreateAccountButton,
	CreateAccountButtonText,
	ForgotPassword,
	ForgotPasswordText,
	Title,
} from './styles'

import logoImg from '../../assets/logo.png'

interface SignInFormData {
	email: string
	password: string
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const inputPasswordRef = useRef<TextInput>(null)
	const navigation = useNavigation()
	const { signIn } = useAuth()

	const handleSubmit = useCallback(
		async (data: SignInFormData): Promise<void> => {
			try {
				formRef.current?.setErrors({})

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('E-mail obrigatório')
						.email('Digite um e-mail válido'),
					password: Yup.string().required('Senha obrigatória'),
				})

				await schema.validate(data, {
					abortEarly: false,
				})

				const { email, password } = data

				await signIn({ email, password })
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err)

					formRef.current?.setErrors(errors)
				}

				Alert.alert(
					'Erro na autenticação',
					'Ocorreu um erro ao fazer login, cheque as credenciais',
				)
			}
		},
		[signIn],
	)

	return (
		<>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ flex: 1 }}
				>
					<Container>
						<Image source={logoImg} />

						<View>
							<Title>Faça seu logon</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSubmit}>
							<Input
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								name="email"
								icon="mail"
								placeholder="E-mail"
								returnKeyType="next"
								onSubmitEditing={() =>
									inputPasswordRef.current?.focus()
								}
							/>
							<Input
								ref={inputPasswordRef}
								secureTextEntry
								returnKeyType="send"
								name="password"
								icon="lock"
								placeholder="Senha"
								onSubmitEditing={() => {
									formRef.current?.submitForm()
								}}
							/>
						</Form>
						<Button onPress={() => formRef.current?.submitForm()}>
							Entrar
						</Button>

						<ForgotPassword
							onPress={() => console.log('Esqueci minha senha')}
						>
							<ForgotPasswordText>
								Esqueci minha senha
							</ForgotPasswordText>
						</ForgotPassword>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
				<Icon name="log-in" color="#ff9000" />
				<CreateAccountButtonText>
					Criar uma conta
				</CreateAccountButtonText>
			</CreateAccountButton>
		</>
	)
}

export default SignIn
