import React, { useCallback, useRef } from 'react'
import {
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

import Button from '../../components/Button'
import Input from '../../components/Input'

import {
	BackToSignButton,
	BackToSignButtonText,
	Container,
	Title,
} from './styles'

import logoImg from '../../assets/logo.png'

interface SignUpProps {
	name: string
	email: string
	password: string
}

const SignUp: React.FC = () => {
	const inputEmailRef = useRef<TextInput>(null)
	const inputPasswordRef = useRef<TextInput>(null)
	const formRef = useRef<FormHandles>(null)

	const navigation = useNavigation()

	const handleSignUp = useCallback((data: SignUpProps) => {
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
							<Title>Crie sua conta</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSignUp}>
							<Input
								autoCapitalize="words"
								name="name"
								icon="user"
								placeholder="Nome"
								returnKeyType="next"
								onSubmitEditing={() =>
									inputEmailRef.current?.focus()
								}
							/>
							<Input
								ref={inputEmailRef}
								keyboardType="email-address"
								autoCorrect={false}
								autoCapitalize="none"
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
								name="password"
								icon="lock"
								placeholder="Senha"
								textContentType="newPassword"
								returnKeyType="send"
								onSubmitEditing={() =>
									formRef.current?.submitForm()
								}
							/>
						</Form>

						<Button onPress={() => formRef.current?.submitForm()}>
							Entrar
						</Button>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<BackToSignButton onPress={() => navigation.goBack()}>
				<Icon name="arrow-left" color="#fff" />
				<BackToSignButtonText>Voltar para logon</BackToSignButtonText>
			</BackToSignButton>
		</>
	)
}

export default SignUp
