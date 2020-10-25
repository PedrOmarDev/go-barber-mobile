import React, { useCallback, useRef } from 'react'
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Button from '../../components/Button'
import Input from '../../components/Input'

import {
	Container,
	CreateAccountButton,
	CreateAccountButtonText,
	ForgotPassword,
	ForgotPasswordText,
	Title,
} from './styles'

import logoImg from '../../assets/logo.png'

interface SignInProps {
	email: string
	password: string
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null)
	const navigation = useNavigation()

	const handleSignIn = useCallback((data: SignInProps) => {
		console.log('data: ', data)
	}, [])

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

						<Form ref={formRef} onSubmit={handleSignIn}>
							<Input
								name="email"
								icon="mail"
								placeholder="E-mail"
							/>
							<Input
								name="password"
								icon="lock"
								placeholder="Senha"
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