import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation, LanguageToggle } from '../context/TranslationContext';
import { supabase } from '../lib/supabase';

interface LoginForm {
  email: string;
  password: string;
  country: string;
  rememberMe: boolean;
  name?: string;
  sector?: string;
  organization?: string;
}

const LoginAfricasHands: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    country: '',
    rememberMe: false,
    name: '',
    sector: '',
    organization: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, register, loginWithFacebook, loginWithGoogle } = useAuth();
  const { t } = useTranslation();

  const countries = [
    { code: 'AO', name: t('country.angola'), flag: '🇦🇴' },
    { code: 'NA', name: t('country.namibia'), flag: '🇳🇦' },
    { code: 'ZA', name: t('country.southAfrica'), flag: '🇿🇦' },
    { code: 'OTHER', name: 'Outros países', flag: '🌍' }
  ];

  const sectors = [
    { value: 'Saúde', label: `🏥 ${t('sector.health')}`, icon: '🏥' },
    { value: 'Educação', label: `🎓 ${t('sector.education')}`, icon: '🎓' },
    { value: 'Turismo', label: `🏨 ${t('sector.tourism')}`, icon: '🏨' },
    { value: 'Comércio', label: `🛒 ${t('sector.commerce')}`, icon: '🛒' },
    { value: 'Transporte', label: `✈️ ${t('sector.transport')}`, icon: '✈️' },
    { value: 'Tecnologia', label: `💻 ${t('sector.technology')}`, icon: '💻' },
    { value: 'Gestão Executiva', label: `👨‍💼 ${t('login.sectors.executive')}`, icon: '👨‍💼' },
    { value: 'Governo', label: `🏛️ ${t('login.sectors.government')}`, icon: '🏛️' },
    { value: 'ONGs', label: `🤝 ${t('login.sectors.ngos')}`, icon: '🤝' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setErrorMessage(t('login.errors.fillAllFields'));
      return false;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage(t('login.errors.invalidEmail'));
      return false;
    }

    if (formData.password.length < 6) {
      setErrorMessage(t('login.errors.passwordTooShort'));
      return false;
    }

    if (!isLogin) {
      if (!formData.name || !formData.country) {
        setErrorMessage(t('login.errors.nameCountryRequired'));
        return false;
      }
    } else {
      if (!formData.country) {
        setErrorMessage(t('login.errors.selectCountry'));
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        // Login
        console.log('🔐 [LoginForm] Tentando login para:', formData.email);
        await login(formData.email, formData.password);
        setSuccessMessage(t('login.messages.loginSuccess'));
        
        console.log('✅ [LoginForm] Login bem-sucedido, aguardando redirecionamento automático...');
        
      } else {
        // Registro
        console.log('📝 [LoginForm] Tentando registro para:', formData.email);
        
        await register(formData.email, formData.password, {
          name: formData.name!,
          country: formData.country,
          sector: formData.sector,
          organization: formData.organization,
          role: formData.email.includes('admin') ? 'admin' : 'user'
        });
        
        // ✅ CORREÇÃO: Mensagem adequada para o fluxo atual
        setSuccessMessage('Conta criada com sucesso! Você já pode fazer login.');
        setIsLogin(true); // Mudar para tela de login
        
        // Limpar formulário após registro bem-sucedido
        setFormData({
          email: formData.email, // Manter email para facilitar login
          password: '',
          country: formData.country,
          rememberMe: false,
          name: '',
          sector: '',
          organization: ''
        });
        
        console.log('✅ [LoginForm] Registro bem-sucedido, mudando para tela de login');
      }
    } catch (error: any) {
      console.error('❌ [LoginForm] Erro na autenticação:', error);
      
      // Tratar diferentes tipos de erro
      if (error.message?.includes('Invalid login credentials')) {
        setErrorMessage(t('login.errors.invalidCredentials'));
      } else if (error.message?.includes('Email not confirmed')) {
        setErrorMessage('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada.');
      } else if (error.message?.includes('User already registered')) {
        setErrorMessage(t('login.errors.userAlreadyExists'));
      } else if (error.message?.includes('Password should be at least 6 characters')) {
        setErrorMessage(t('login.errors.passwordTooShort'));
      } else if (error.message?.includes('Database error saving new user')) {
        setErrorMessage('Erro no banco de dados. Tente novamente em alguns segundos.');
      } else {
        setErrorMessage(error.message || t('login.errors.authenticationError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 🚀 FUNÇÃO: Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      console.log('🔐 [LoginForm] Iniciando login com Google...');
      await loginWithGoogle();
      
      // Não precisa de mais nada aqui - o AuthContext cuida do resto
    } catch (error: any) {
      console.error('❌ [LoginForm] Erro no login Google:', error);
      setErrorMessage(error.message || 'Erro no login com Google');
      setIsLoading(false);
    }
  };

  // 🚀 FUNÇÃO: Handle Facebook Login
  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      console.log('🔐 [LoginForm] Iniciando login com Facebook...');
      await loginWithFacebook();
      
      // Não precisa de mais nada aqui - o AuthContext cuida do resto
    } catch (error: any) {
      console.error('❌ [LoginForm] Erro no login Facebook:', error);
      setErrorMessage(error.message || 'Erro no login com Facebook');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrorMessage(t('login.errors.enterEmailFirst'));
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      console.log('🔑 [LoginForm] Enviando email de recuperação para:', formData.email);
      
      // ✅ IMPLEMENTAÇÃO REAL do reset de senha
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      setSuccessMessage(`Email de recuperação enviado para ${formData.email}. Verifique sua caixa de entrada.`);
      console.log('✅ [LoginForm] Email de recuperação enviado com sucesso');
      
    } catch (error: any) {
      console.error('❌ [LoginForm] Erro ao enviar email de recuperação:', error);
      setErrorMessage('Erro ao enviar email de recuperação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">{t('company.name')}</h1>
            <p className="text-xl text-red-100">{t('login.slogan')}</p>
          </div>

          {/* Countries */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">🇦🇴</span>
              <span className="text-3xl">🇳🇦</span>
              <span className="text-3xl">🇿🇦</span>
            </div>
            <p className="text-lg text-red-100 mb-6">
              {t('login.countriesDescription')}
            </p>
            <p className="text-red-200">
              {t('company.description')}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">🏥</span>
              </div>
              <span className="text-red-100">{t('login.features.regionalHealth')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">🎓</span>
              </div>
              <span className="text-red-100">{t('login.features.universityExchange')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">🛒</span>
              </div>
              <span className="text-red-100">{t('login.features.regionalMarketplace')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">💻</span>
              </div>
              <span className="text-red-100">{t('login.features.innovationHub')}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">95M+</div>
              <div className="text-sm text-red-200">{t('login.stats.population')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-red-200">{t('login.stats.countries')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm text-red-200">{t('login.stats.sectors')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Language Toggle - Modificado para ser mais visível */}
          <div className="flex justify-end mb-6">
            <div className="relative group">
              <LanguageToggle />
              <div className="absolute inset-0 -z-10 bg-gray-100 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200"></div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? t('login.welcomeBack') : t('login.createAccount')}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? t('login.accessAccountDescription')
                : t('login.joinNetworkDescription')
              }
            </p>
          </div>

          {/* Toggle Login/Register */}
          <div className="bg-gray-100 rounded-lg p-1 mb-8">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`py-2 px-4 rounded-md font-medium transition-colors ${
                  isLogin 
                    ? 'bg-white text-red-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('login.signIn')}
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`py-2 px-4 rounded-md font-medium transition-colors ${
                  !isLogin 
                    ? 'bg-white text-red-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('login.register')}
              </button>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            </div>
          )}



          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name (only for registration) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.form.fullName')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={t('login.form.fullNamePlaceholder')}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.form.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={t('login.form.emailPlaceholder')}
              />
              {isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  💡 {t('login.form.emailTip')}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.form.password')} *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={t('login.form.passwordPlaceholder')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  {t('login.form.passwordRequirement')}
                </p>
              )}
            </div>

            {/* Country Selection */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.country')} *
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t('login.form.selectCountry')}</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sector and Organization (only for registration) */}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('login.form.sector')}
                  </label>
                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">{t('login.form.selectSector')}</option>
                    {sectors.map((sector) => (
                      <option key={sector.value} value={sector.value}>
                        {sector.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('login.form.organization')}
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder={t('login.form.organizationPlaceholder')}
                  />
                </div>
              </>
            )}

            {/* Remember Me & Forgot Password */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">{t('login.form.rememberMe')}</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                >
                  {t('login.forgotPassword.link')}
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? t('login.buttons.signingIn') : t('login.buttons.creatingAccount')}
                </>
              ) : (
                <>
                  <span>{isLogin ? '🚀' : '✨'}</span>
                  {isLogin ? t('login.buttons.enterPlatform') : t('login.buttons.createMyAccount')}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">{t('login.socialLogin.orContinueWith')}</span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              type="button"
              disabled={isLoading}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('login.buttons.signingIn')}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {t('login.socialLogin.continueWithGoogle')}
                </>
              )}
            </button>

            <button 
              onClick={handleFacebookLogin}
              type="button"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('login.buttons.signingIn')}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  {t('login.socialLogin.continueWithFacebook')}
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              {t('login.footer.agreement')} {' '}
              <a href="#" className="text-red-600 hover:text-red-700">{t('login.footer.termsOfUse')}</a> {t('login.footer.and')} {' '}
              <a href="#" className="text-red-600 hover:text-red-700">{t('login.footer.privacyPolicy')}</a>
            </p>
            <p className="mt-4">
              <strong>{t('login.footer.developedBy')}:</strong> {t('company.developer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAfricasHands;