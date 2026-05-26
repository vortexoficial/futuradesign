(function () {
    'use strict';

    const APPS_SCRIPT_WEB_APP_URL = '';

    const ERROR_COPY = {
        required: 'Preencha esta informação para continuar.',
        invalidEmail: 'Informe um e-mail válido.',
        invalidPhone: 'Informe um WhatsApp válido no formato (00)-99999-9999.',
        invalidUrl: 'Informe um link válido.',
        maxSelection: 'Selecione no máximo 3 opções.',
        minLength: 'Inclua um pouco mais de contexto para continuarmos com clareza.',
        otherRequired: 'Descreva a opção "Outro" para continuar.'
    };

    const FORM_SECTIONS = [
        {
            id: 'identificacao',
            title: 'Primeiro, vamos conhecer você e sua marca.',
            steps: [
                {
                    id: 'client_name',
                    question: 'Qual é o seu nome?',
                    help: 'Informe o nome da pessoa responsável pelo projeto.',
                    type: 'text',
                    placeholder: 'Digite seu nome completo',
                    required: true,
                    autocomplete: 'name'
                },
                {
                    id: 'company_name',
                    question: 'Qual é o nome da sua empresa ou marca?',
                    help: 'Use o nome que deverá aparecer na landing page.',
                    type: 'text',
                    placeholder: 'Nome da empresa ou marca',
                    required: true
                },
                {
                    id: 'whatsapp',
                    question: 'Qual é o seu WhatsApp para contato?',
                    help: 'Utilizaremos este número para tratar sobre o projeto.',
                    type: 'tel',
                    placeholder: '(00)-99999-9999',
                    required: true,
                    autocomplete: 'tel'
                },
                {
                    id: 'email',
                    question: 'Qual é o seu melhor e-mail?',
                    help: 'Este e-mail poderá ser utilizado para comunicações sobre o projeto.',
                    type: 'email',
                    placeholder: 'voce@empresa.com',
                    required: true,
                    autocomplete: 'email'
                },
                {
                    id: 'current_channels',
                    question: 'Sua empresa já possui site ou redes sociais?',
                    help: 'Envie links do Instagram, site, loja virtual ou outros canais atuais.',
                    type: 'textarea',
                    placeholder: 'Cole aqui os links disponíveis',
                    required: false
                },
                {
                    id: 'service_region',
                    question: 'Onde sua empresa atua ou atende?',
                    help: 'Pode ser uma cidade, região, estado ou atendimento em todo o Brasil.',
                    type: 'text',
                    placeholder: 'Ex.: Salvador e região / Todo o Brasil / Online',
                    required: true
                }
            ]
        },
        {
            id: 'objetivo',
            title: 'Agora precisamos entender o objetivo da página.',
            steps: [
                {
                    id: 'landing_goal',
                    question: 'Qual é o principal objetivo da sua landing page?',
                    type: 'single_select',
                    required: true,
                    options: [
                        'Vender um produto',
                        'Divulgar um serviço',
                        'Captar contatos interessados',
                        'Receber mensagens no WhatsApp',
                        'Agendar atendimentos',
                        'Solicitar orçamentos',
                        'Divulgar um lançamento',
                        'Captar inscrições',
                        'Outro'
                    ],
                    conditionalField: {
                        showWhen: 'Outro',
                        placeholder: 'Descreva o objetivo principal'
                    }
                },
                {
                    id: 'primary_action',
                    question: 'Qual ação você deseja que o visitante realize na página?',
                    type: 'single_select',
                    required: true,
                    options: [
                        'Comprar agora',
                        'Chamar no WhatsApp',
                        'Preencher um formulário',
                        'Agendar atendimento',
                        'Solicitar orçamento',
                        'Baixar um material',
                        'Entrar em uma lista de espera',
                        'Outro'
                    ],
                    conditionalField: {
                        showWhen: 'Outro',
                        placeholder: 'Qual ação o visitante deve realizar?'
                    }
                },
                {
                    id: 'traffic_source',
                    question: 'Como as pessoas chegarão até essa página?',
                    help: 'Selecione todas as opções previstas.',
                    type: 'multi_select',
                    required: true,
                    options: [
                        'Anúncios no Instagram ou Facebook',
                        'Google Ads',
                        'Link na bio do Instagram',
                        'WhatsApp',
                        'Google ou buscas orgânicas',
                        'E-mail marketing',
                        'Influenciadores ou parceiros',
                        'Ainda não definido',
                        'Outro'
                    ]
                }
            ]
        },
        {
            id: 'oferta',
            title: 'Vamos entender sua oferta.',
            steps: [
                {
                    id: 'offer_name',
                    question: 'Qual produto ou serviço será divulgado?',
                    type: 'text',
                    placeholder: 'Nome do produto, serviço, evento ou solução',
                    required: true
                },
                {
                    id: 'offer_description',
                    question: 'Descreva detalhadamente o que você está oferecendo.',
                    help: 'Explique como funciona, o que está incluído e o que a pessoa recebe.',
                    type: 'textarea',
                    placeholder: 'Conte todos os detalhes importantes da sua oferta',
                    required: true,
                    minLength: 30
                },
                {
                    id: 'problem_solved',
                    question: 'Qual problema essa oferta resolve?',
                    help: 'Pense no principal motivo que levaria alguém a procurar sua solução.',
                    type: 'textarea',
                    placeholder: 'Ex.: ajuda empresas a conseguir mais pedidos pelo WhatsApp...',
                    required: true
                },
                {
                    id: 'main_benefits',
                    question: 'Quais são os principais benefícios da sua oferta?',
                    help: 'Liste os benefícios mais importantes para o cliente.',
                    type: 'textarea',
                    placeholder: 'Digite um benefício por linha',
                    required: true
                },
                {
                    id: 'differentials',
                    question: 'O que diferencia sua empresa ou oferta dos concorrentes?',
                    type: 'textarea',
                    placeholder: 'Ex.: atendimento personalizado, experiência, rapidez, garantia...',
                    required: true
                },
                {
                    id: 'price_conditions',
                    question: 'Existe preço, promoção ou condição comercial que deverá aparecer na página?',
                    type: 'textarea',
                    placeholder: 'Ex.: A partir de R$ 299, parcelamento, promoção por tempo limitado...',
                    required: false
                },
                {
                    id: 'payment_methods',
                    question: 'Quais formas de pagamento são aceitas?',
                    type: 'multi_select',
                    required: false,
                    options: [
                        'Pix',
                        'Cartão de crédito',
                        'Cartão de débito',
                        'Boleto',
                        'Transferência',
                        'Pagamento presencial',
                        'Link de pagamento',
                        'Ainda não definido',
                        'Outro'
                    ]
                },
                {
                    id: 'guarantee_refund',
                    question: 'Existe garantia, troca, cancelamento ou política de reembolso?',
                    type: 'textarea',
                    placeholder: 'Descreva as regras ou informe que ainda não possui',
                    required: false
                }
            ]
        },
        {
            id: 'publico',
            title: 'Quem você deseja alcançar?',
            steps: [
                {
                    id: 'target_audience',
                    question: 'Quem é o público ideal dessa landing page?',
                    help: 'Descreva quem são as pessoas que mais têm chance de contratar ou comprar.',
                    type: 'textarea',
                    placeholder: 'Ex.: mulheres de 25 a 45 anos, empresários locais, mães de primeira viagem...',
                    required: true
                },
                {
                    id: 'audience_location',
                    question: 'Onde esse público está localizado?',
                    type: 'text',
                    placeholder: 'Ex.: Salvador, Bahia / Brasil inteiro / Atendimento online',
                    required: false
                },
                {
                    id: 'audience_pains',
                    question: 'Quais são as principais dores ou necessidades desse público?',
                    type: 'textarea',
                    placeholder: 'Liste os problemas, preocupações ou desejos mais comuns',
                    required: true
                },
                {
                    id: 'audience_objections',
                    question: 'Quais dúvidas ou objeções costumam impedir a compra?',
                    help: 'Ex.: preço, confiança, prazo, medo de não funcionar ou dúvidas sobre entrega.',
                    type: 'textarea',
                    placeholder: 'Digite as principais objeções',
                    required: false
                }
            ]
        },
        {
            id: 'identidade_visual',
            title: 'Vamos cuidar da apresentação visual.',
            steps: [
                {
                    id: 'has_logo',
                    question: 'Sua marca já possui logo?',
                    type: 'single_select',
                    required: true,
                    options: [
                        'Sim, possuo logo pronta',
                        'Ainda não possuo logo',
                        'Tenho uma logo, mas gostaria de avaliar melhorias'
                    ]
                },
                {
                    id: 'logo_upload',
                    question: 'Envie sua logo ou informe onde podemos acessá-la.',
                    help: 'Aceitar arquivos ou links. A integração definitiva do upload será preparada posteriormente com Google Apps Script.',
                    type: 'file_or_link',
                    placeholder: 'Cole o link da pasta ou selecione o arquivo',
                    accept: '.png,.jpg,.jpeg,.svg,.webp,.pdf',
                    required: false,
                    visibleWhen: (answers) => answers.has_logo && answers.has_logo !== 'Ainda não possuo logo'
                },
                {
                    id: 'brand_colors',
                    question: 'Sua marca possui cores definidas?',
                    type: 'textarea',
                    placeholder: 'Informe as cores, códigos hexadecimais ou descreva o estilo desejado',
                    required: false
                },
                {
                    id: 'brand_manual',
                    question: 'Você possui manual da marca, fontes ou materiais de identidade visual?',
                    type: 'file_or_link',
                    placeholder: 'Cole um link ou selecione arquivos',
                    required: false
                },
                {
                    id: 'desired_visual_style',
                    question: 'Como você gostaria que sua landing page parecesse?',
                    help: 'Selecione até 3 estilos.',
                    type: 'multi_select',
                    maxSelection: 3,
                    required: true,
                    options: [
                        'Moderna',
                        'Premium',
                        'Minimalista',
                        'Elegante',
                        'Sofisticada',
                        'Criativa',
                        'Jovem',
                        'Popular',
                        'Tecnológica',
                        'Delicada',
                        'Impactante',
                        'Ainda não sei'
                    ]
                },
                {
                    id: 'avoid_visual_style',
                    question: 'Existe algum estilo visual que você não deseja utilizar?',
                    type: 'textarea',
                    placeholder: 'Ex.: não quero cores fortes, não quero algo infantil, evitar visual muito carregado...',
                    required: false
                }
            ]
        },
        {
            id: 'materiais_referencias',
            title: 'Materiais ajudam a construir uma página mais convincente.',
            steps: [
                {
                    id: 'product_images',
                    question: 'Você possui fotos do produto, serviço, espaço ou equipe?',
                    help: 'Envie links ou arquivos disponíveis. O armazenamento definitivo será integrado posteriormente ao Apps Script.',
                    type: 'file_or_link',
                    placeholder: 'Cole o link da pasta ou selecione arquivos',
                    required: false
                },
                {
                    id: 'videos_materials',
                    question: 'Você possui vídeos, catálogos, apresentações ou materiais complementares?',
                    type: 'file_or_link',
                    placeholder: 'Cole links ou selecione arquivos disponíveis',
                    required: false
                },
                {
                    id: 'visual_references',
                    question: 'Existem sites ou landing pages que você gosta como referência?',
                    type: 'textarea',
                    placeholder: 'Cole um ou mais links de referência',
                    required: false
                },
                {
                    id: 'reference_reason',
                    question: 'O que você gostou nessas referências?',
                    type: 'textarea',
                    placeholder: 'Ex.: cores, organização, estilo, animações, textos, apresentação do produto...',
                    required: false,
                    visibleWhen: (answers) => hasText(answers.visual_references)
                }
            ]
        },
        {
            id: 'autoridade',
            title: 'Confiança faz parte da decisão de compra.',
            steps: [
                {
                    id: 'testimonials',
                    question: 'Você possui depoimentos de clientes?',
                    help: 'Você pode escrever os depoimentos ou enviar prints autorizados.',
                    type: 'file_or_text',
                    placeholder: 'Cole os depoimentos ou envie arquivos',
                    required: false
                },
                {
                    id: 'reviews',
                    question: 'Você possui avaliações no Google, Instagram, WhatsApp ou outra plataforma?',
                    type: 'file_or_link',
                    placeholder: 'Cole links ou envie prints das avaliações',
                    required: false
                },
                {
                    id: 'authority_numbers',
                    question: 'Existem números ou resultados importantes que podemos destacar?',
                    help: 'Ex.: anos de experiência, clientes atendidos, projetos entregues ou quantidade de pedidos.',
                    type: 'textarea',
                    placeholder: 'Informe apenas dados reais e verificáveis',
                    required: false
                },
                {
                    id: 'certificates_partners',
                    question: 'Você possui certificados, prêmios, parceiros ou marcas atendidas?',
                    type: 'textarea',
                    placeholder: 'Informe os detalhes e, se possível, envie os materiais correspondentes',
                    required: false
                },
                {
                    id: 'before_after',
                    question: 'Possui imagens de antes e depois autorizadas para utilização?',
                    help: 'Envie somente materiais que possam ser divulgados e que estejam adequados às regras do seu segmento.',
                    type: 'file_or_link',
                    placeholder: 'Cole links ou selecione arquivos',
                    required: false
                }
            ]
        },
        {
            id: 'conversao',
            title: 'Qual será o caminho do visitante até o contato ou compra?',
            steps: [
                {
                    id: 'page_whatsapp',
                    question: 'Qual WhatsApp deverá aparecer na landing page?',
                    type: 'tel',
                    placeholder: '(00)-99999-9999',
                    required: false,
                    autocomplete: 'tel'
                },
                {
                    id: 'whatsapp_message',
                    question: 'Qual mensagem automática deverá aparecer quando alguém clicar no WhatsApp?',
                    type: 'textarea',
                    placeholder: 'Ex.: Olá! Vim pela página e gostaria de saber mais sobre o serviço.',
                    required: false
                },
                {
                    id: 'checkout_link',
                    question: 'Existe link de pagamento, checkout ou página de compra?',
                    type: 'url',
                    placeholder: 'Cole o link, caso exista',
                    required: false
                },
                {
                    id: 'scheduling_link',
                    question: 'Existe link de agendamento ou reserva?',
                    type: 'url',
                    placeholder: 'Cole o link, caso exista',
                    required: false
                },
                {
                    id: 'lead_form_required',
                    question: 'A landing page deverá possuir formulário para captar contatos?',
                    type: 'single_select',
                    required: true,
                    options: [
                        'Sim',
                        'Não',
                        'Ainda não sei, preciso de orientação'
                    ]
                },
                {
                    id: 'lead_form_fields',
                    question: 'Quais informações deverão ser solicitadas ao visitante?',
                    type: 'multi_select',
                    required: false,
                    visibleWhen: (answers) => answers.lead_form_required === 'Sim',
                    options: [
                        'Nome',
                        'WhatsApp',
                        'E-mail',
                        'Cidade',
                        'Produto ou serviço de interesse',
                        'Mensagem',
                        'Outro'
                    ]
                },
                {
                    id: 'lead_destination',
                    question: 'Para onde os contatos captados deverão ser enviados?',
                    type: 'multi_select',
                    required: false,
                    visibleWhen: (answers) => answers.lead_form_required === 'Sim',
                    options: [
                        'WhatsApp',
                        'E-mail',
                        'Planilha Google',
                        'CRM',
                        'Ainda não definido',
                        'Outro'
                    ]
                }
            ]
        },
        {
            id: 'dominio_publicacao',
            title: 'Publicação e estrutura técnica.',
            steps: [
                {
                    id: 'has_domain',
                    question: 'Você já possui domínio registrado?',
                    type: 'single_select',
                    required: true,
                    options: [
                        'Sim',
                        'Não',
                        'Não sei informar'
                    ]
                },
                {
                    id: 'domain_address',
                    question: 'Qual é o endereço do domínio?',
                    type: 'text',
                    placeholder: 'Ex.: minhaempresa.com.br',
                    required: false,
                    visibleWhen: (answers) => answers.has_domain === 'Sim'
                },
                {
                    id: 'hosting_platform',
                    question: 'Você já possui hospedagem, plataforma ou site onde a página será publicada?',
                    type: 'textarea',
                    placeholder: 'Ex.: WordPress, Hostinger, Shopify, Nuvemshop, site próprio ou ainda não possuo',
                    required: false
                },
                {
                    id: 'existing_site_integration',
                    question: 'A landing page deverá fazer parte de um site existente ou será uma página independente?',
                    type: 'single_select',
                    required: true,
                    options: [
                        'Será uma página independente',
                        'Será integrada ao meu site atual',
                        'Ainda não sei'
                    ]
                },
                {
                    id: 'launch_date',
                    question: 'Existe uma data desejada para colocar a página no ar?',
                    type: 'date_or_text',
                    placeholder: 'Selecione uma data ou descreva o prazo desejado',
                    required: false
                }
            ]
        },
        {
            id: 'anuncios_medicao',
            title: 'Medição permite melhorar com segurança.',
            steps: [
                {
                    id: 'paid_traffic',
                    question: 'A landing page será utilizada em campanhas de anúncios?',
                    type: 'single_select',
                    required: true,
                    options: [
                        'Sim',
                        'Não',
                        'Talvez futuramente',
                        'Ainda não sei'
                    ]
                },
                {
                    id: 'advertising_platforms',
                    question: 'Quais plataformas de anúncio serão utilizadas?',
                    type: 'multi_select',
                    required: false,
                    visibleWhen: (answers) => answers.paid_traffic === 'Sim',
                    options: [
                        'Meta Ads - Instagram e Facebook',
                        'Google Ads',
                        'TikTok Ads',
                        'Outra plataforma',
                        'Ainda não definido'
                    ]
                },
                {
                    id: 'tracking_tools',
                    question: 'Você já possui ferramentas de medição configuradas?',
                    type: 'multi_select',
                    required: false,
                    options: [
                        'Meta Pixel',
                        'Google Analytics',
                        'Google Tag Manager',
                        'Google Ads',
                        'Nenhuma',
                        'Não sei informar',
                        'Outra'
                    ]
                },
                {
                    id: 'conversion_events',
                    question: 'Quais ações deverão ser medidas na página?',
                    type: 'multi_select',
                    required: false,
                    options: [
                        'Cliques no WhatsApp',
                        'Envio de formulário',
                        'Compras',
                        'Cliques em botão de pagamento',
                        'Agendamentos',
                        'Visualizações da página',
                        'Ainda não definido',
                        'Outro'
                    ]
                }
            ]
        },
        {
            id: 'seo_compartilhamento',
            title: 'Detalhes para pesquisa e compartilhamento.',
            steps: [
                {
                    id: 'seo_title',
                    question: 'Existe algum título desejado para a página no Google ou navegador?',
                    type: 'text',
                    placeholder: 'Ex.: Clínica Estética em Salvador | Nome da Marca',
                    required: false
                },
                {
                    id: 'seo_keywords',
                    question: 'Existem palavras-chave ou termos importantes relacionados ao seu negócio?',
                    type: 'textarea',
                    placeholder: 'Ex.: reforma residencial em Salvador, curso online de confeitaria...',
                    required: false
                },
                {
                    id: 'sharing_image',
                    question: 'Possui imagem específica para compartilhamento no WhatsApp e redes sociais?',
                    type: 'file_or_link',
                    placeholder: 'Cole um link ou selecione um arquivo',
                    required: false
                }
            ]
        },
        {
            id: 'legal_aprovacao',
            title: 'Informações finais para uma entrega segura.',
            steps: [
                {
                    id: 'privacy_terms',
                    question: 'Sua empresa possui política de privacidade, termos, política de troca ou reembolso?',
                    type: 'file_or_link',
                    placeholder: 'Cole links, envie arquivos ou informe que ainda não possui',
                    required: false
                },
                {
                    id: 'regulated_segment',
                    question: 'Seu negócio pertence a algum segmento com regras específicas de comunicação?',
                    help: 'Ex.: saúde, estética, suplementos, finanças, advocacia, bebidas, cursos ou produtos regulados.',
                    type: 'textarea',
                    placeholder: 'Descreva o segmento e qualquer informação obrigatória',
                    required: false
                },
                {
                    id: 'approval_contact',
                    question: 'Quem será responsável por aprovar textos e visual da landing page?',
                    type: 'text',
                    placeholder: 'Nome da pessoa responsável',
                    required: true
                },
                {
                    id: 'additional_information',
                    question: 'Existe mais alguma informação importante sobre o projeto?',
                    type: 'textarea',
                    placeholder: 'Conte qualquer detalhe que ainda não foi mencionado',
                    required: false
                },
                {
                    id: 'consent',
                    question: 'Confirma o envio dessas informações para análise e desenvolvimento da sua landing page?',
                    type: 'checkbox',
                    required: true,
                    options: [
                        'Autorizo o uso das informações e arquivos enviados exclusivamente para análise, planejamento e desenvolvimento do projeto solicitado.'
                    ]
                }
            ]
        }
    ];

    const REVIEW_GROUPS = [
        { label: 'Nome e marca', ids: ['client_name', 'company_name'] },
        { label: 'Contato', ids: ['whatsapp', 'email'] },
        { label: 'Objetivo principal', ids: ['landing_goal', 'primary_action', 'traffic_source'] },
        { label: 'Produto ou serviço', ids: ['offer_name', 'offer_description'] },
        { label: 'Público-alvo', ids: ['target_audience', 'audience_pains'] },
        { label: 'Estilo visual desejado', ids: ['desired_visual_style', 'avoid_visual_style'] },
        { label: 'Canais de conversão', ids: ['page_whatsapp', 'lead_form_required', 'lead_destination'] },
        { label: 'Prazo desejado', ids: ['launch_date'] },
        { label: 'Informações adicionais', ids: ['additional_information', 'regulated_segment'] }
    ];

    const state = {
        currentIndex: 0,
        answers: {},
        files: {},
        submitState: 'idle'
    };

    const elements = {};

    function byId(id) {
        return document.getElementById(id);
    }

    function hasText(value) {
        return String(value || '').trim().length > 0;
    }

    function pad(number) {
        return String(number).padStart(2, '0');
    }

    function getAllSteps() {
        return FORM_SECTIONS.flatMap((section) =>
            section.steps.map((step) => ({
                ...step,
                sectionId: section.id,
                sectionTitle: section.title
            }))
        );
    }

    function getVisibleSteps() {
        return getAllSteps().filter((step) => {
            if (typeof step.visibleWhen !== 'function') return true;
            return Boolean(step.visibleWhen(state.answers));
        });
    }

    function getCurrentStep() {
        const steps = getVisibleSteps();
        if (state.currentIndex >= steps.length) {
            state.currentIndex = Math.max(0, steps.length - 1);
        }
        return steps[state.currentIndex];
    }

    function showScreen(screenName) {
        const screens = [
            elements.introScreen,
            elements.formScreen,
            elements.reviewScreen,
            elements.successScreen
        ];

        screens.forEach((screen) => {
            if (!screen) return;
            screen.hidden = true;
            screen.classList.remove('briefing-screen-active');
        });

        const activeScreen = elements[screenName];
        if (!activeScreen) return;

        activeScreen.hidden = false;
        window.requestAnimationFrame(() => activeScreen.classList.add('briefing-screen-active'));
    }

    function updateLogo() {
        const isDark = document.documentElement.classList.contains('dark');
        const target = isDark ? '../../img/logob.webp' : '../../img/logop.webp';
        document.querySelectorAll('.theme-logo').forEach((img) => {
            img.src = target;
        });
    }

    function updateProgress(mode) {
        const steps = getVisibleSteps();
        let text = 'Introdução';
        let percent = 0;

        if (mode === 'form') {
            const stepNumber = state.currentIndex + 1;
            text = `Etapa ${pad(stepNumber)} de ${pad(steps.length)}`;
            percent = Math.round((stepNumber / (steps.length + 1)) * 100);
        }

        if (mode === 'review') {
            text = 'Revisão final';
            percent = 100;
        }

        if (mode === 'success') {
            text = 'Concluído';
            percent = 100;
        }

        elements.progressText.textContent = text;
        elements.progressBar.style.width = `${percent}%`;
    }

    function setError(message) {
        elements.fieldError.textContent = message || '';
        const activeField = elements.fieldContainer.querySelector('[data-briefing-field]');
        if (activeField) {
            if (message) {
                activeField.setAttribute('aria-invalid', 'true');
            } else {
                activeField.removeAttribute('aria-invalid');
            }
        }
    }

    function clearError() {
        setError('');
    }

    function createHiddenLabel(step, targetId) {
        const label = document.createElement('label');
        label.className = 'briefing-sr-only';
        label.setAttribute('for', targetId);
        label.textContent = step.question;
        return label;
    }

    function createInput(step, inputType) {
        const inputId = `field-${step.id}`;
        const input = document.createElement('input');
        input.id = inputId;
        input.type = inputType;
        input.className = 'briefing-input';
        input.placeholder = step.placeholder || '';
        input.value = state.answers[step.id] || '';
        input.autocomplete = step.autocomplete || 'off';
        input.setAttribute('data-briefing-field', step.id);
        input.setAttribute('aria-describedby', 'step-help field-error');
        input.required = Boolean(step.required);
        if (inputType === 'tel') {
            input.inputMode = 'numeric';
            input.maxLength = 15;
            input.pattern = '\\([1-9]{2}\\)-9\\d{4}-\\d{4}';
            input.value = formatPhoneBR(input.value);
            state.answers[step.id] = input.value;
        }
        if (inputType === 'email') {
            input.inputMode = 'email';
            input.autocapitalize = 'none';
            input.spellcheck = false;
            input.pattern = '[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}';
        }
        input.addEventListener('input', () => {
            if (inputType === 'tel') {
                input.value = formatPhoneBR(input.value);
            }
            if (inputType === 'email') {
                input.value = input.value.trim().toLowerCase();
            }
            state.answers[step.id] = input.value;
            clearError();
        });
        input.addEventListener('blur', () => {
            if (inputType === 'tel' && hasText(input.value) && !isValidPhone(input.value)) {
                setError(ERROR_COPY.invalidPhone);
            }
            if (inputType === 'email' && hasText(input.value) && !isValidEmail(input.value)) {
                setError(ERROR_COPY.invalidEmail);
            }
        });

        elements.fieldContainer.appendChild(createHiddenLabel(step, inputId));
        elements.fieldContainer.appendChild(input);
    }

    function createTextarea(step) {
        const textareaId = `field-${step.id}`;
        const textarea = document.createElement('textarea');
        textarea.id = textareaId;
        textarea.className = 'briefing-textarea';
        textarea.placeholder = step.placeholder || '';
        textarea.value = state.answers[step.id] || '';
        textarea.rows = 6;
        textarea.setAttribute('data-briefing-field', step.id);
        textarea.setAttribute('aria-describedby', 'step-help field-error');
        textarea.required = Boolean(step.required);
        textarea.addEventListener('input', () => {
            state.answers[step.id] = textarea.value;
            clearError();
        });

        elements.fieldContainer.appendChild(createHiddenLabel(step, textareaId));
        elements.fieldContainer.appendChild(textarea);
    }

    function createOptions(step, isMulti) {
        const fieldset = document.createElement('fieldset');
        fieldset.className = `briefing-options ${step.options.length > 6 ? 'briefing-options-grid' : ''}`;
        fieldset.setAttribute('data-briefing-field', step.id);
        fieldset.setAttribute('aria-describedby', 'step-help field-error');

        const legend = document.createElement('legend');
        legend.className = 'briefing-sr-only';
        legend.textContent = step.question;
        fieldset.appendChild(legend);

        const currentValue = isMulti
            ? Array.isArray(state.answers[step.id]) ? state.answers[step.id] : []
            : state.answers[step.id] || '';

        step.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.className = 'briefing-option';
            const input = document.createElement('input');
            input.type = isMulti ? 'checkbox' : 'radio';
            input.name = step.id;
            input.value = option;
            input.id = `field-${step.id}-${index}`;
            input.checked = isMulti ? currentValue.includes(option) : currentValue === option;

            input.addEventListener('change', () => {
                if (isMulti) {
                    const nextValue = Array.from(fieldset.querySelectorAll('input:checked')).map((checked) => checked.value);
                    state.answers[step.id] = nextValue;
                    if (step.maxSelection && nextValue.length > step.maxSelection) {
                        input.checked = false;
                        state.answers[step.id] = nextValue.filter((value) => value !== option);
                        setError(`Selecione no máximo ${step.maxSelection} opções.`);
                        return;
                    }
                    clearError();
                } else {
                    state.answers[step.id] = option;
                    if (step.conditionalField && option !== step.conditionalField.showWhen) {
                        delete state.answers[`${step.id}_other`];
                    }
                    clearError();
                    renderStep({ keepScroll: true, focusOther: option === step.conditionalField?.showWhen });
                }
            });

            const text = document.createElement('span');
            text.textContent = option;
            label.appendChild(input);
            label.appendChild(text);
            fieldset.appendChild(label);
        });

        elements.fieldContainer.appendChild(fieldset);

        if (!isMulti && step.conditionalField && state.answers[step.id] === step.conditionalField.showWhen) {
            const wrapper = document.createElement('div');
            wrapper.className = 'briefing-other-field';
            const otherId = `field-${step.id}-other`;
            const label = document.createElement('label');
            label.className = 'briefing-sr-only';
            label.setAttribute('for', otherId);
            label.textContent = step.conditionalField.placeholder;
            const input = document.createElement('input');
            input.id = otherId;
            input.type = 'text';
            input.className = 'briefing-input';
            input.placeholder = step.conditionalField.placeholder;
            input.value = state.answers[`${step.id}_other`] || '';
            input.setAttribute('data-briefing-field', `${step.id}_other`);
            input.setAttribute('aria-describedby', 'field-error');
            input.addEventListener('input', () => {
                state.answers[`${step.id}_other`] = input.value;
                clearError();
            });
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            elements.fieldContainer.appendChild(wrapper);
        }
    }

    function getFileState(id) {
        if (!state.files[id]) state.files[id] = [];
        return state.files[id];
    }

    function getCompositeValue(id) {
        if (!state.answers[id] || typeof state.answers[id] !== 'object' || Array.isArray(state.answers[id])) {
            state.answers[id] = {};
        }
        return state.answers[id];
    }

    function renderFileList(step, listEl) {
        const files = getFileState(step.id);
        listEl.innerHTML = '';

        files.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'briefing-file-item';
            const text = document.createElement('span');
            const sizeKb = file.size ? ` - ${Math.max(1, Math.round(file.size / 1024))} KB` : '';
            text.textContent = `${file.name}${sizeKb}`;
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'briefing-file-remove';
            removeBtn.textContent = 'Remover';
            removeBtn.addEventListener('click', () => {
                state.files[step.id] = getFileState(step.id).filter((_, fileIndex) => fileIndex !== index);
                const value = getCompositeValue(step.id);
                value.files = state.files[step.id];
                renderFileList(step, listEl);
                clearError();
            });

            item.appendChild(text);
            item.appendChild(removeBtn);
            listEl.appendChild(item);
        });
    }

    function createFileOrLink(step, mode) {
        const value = getCompositeValue(step.id);
        const block = document.createElement('div');
        block.className = 'briefing-file-block';
        block.setAttribute('data-briefing-field', step.id);

        if (mode === 'text') {
            const textareaId = `field-${step.id}-text`;
            const label = document.createElement('label');
            label.className = 'briefing-sr-only';
            label.setAttribute('for', textareaId);
            label.textContent = step.question;
            const textarea = document.createElement('textarea');
            textarea.id = textareaId;
            textarea.className = 'briefing-textarea';
            textarea.placeholder = step.placeholder || '';
            textarea.value = value.text || '';
            textarea.rows = 5;
            textarea.setAttribute('aria-describedby', 'step-help field-error');
            textarea.addEventListener('input', () => {
                value.text = textarea.value;
                clearError();
            });
            block.appendChild(label);
            block.appendChild(textarea);
        } else {
            const inputId = `field-${step.id}-links`;
            const label = document.createElement('label');
            label.className = 'briefing-sr-only';
            label.setAttribute('for', inputId);
            label.textContent = step.question;
            const textarea = document.createElement('textarea');
            textarea.id = inputId;
            textarea.className = 'briefing-textarea';
            textarea.placeholder = step.placeholder || '';
            textarea.value = value.links || '';
            textarea.rows = 4;
            textarea.setAttribute('aria-describedby', 'step-help field-error');
            textarea.addEventListener('input', () => {
                value.links = textarea.value;
                clearError();
            });
            block.appendChild(label);
            block.appendChild(textarea);
        }

        const fileLabel = document.createElement('label');
        fileLabel.className = 'briefing-file-label';
        fileLabel.innerHTML = '<i class="fas fa-paperclip" aria-hidden="true"></i><span>Selecionar arquivos</span>';
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        if (step.accept) fileInput.accept = step.accept;
        fileInput.addEventListener('change', () => {
            const selected = Array.from(fileInput.files || []).map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type || '',
                lastModified: file.lastModified || null
            }));
            state.files[step.id] = getFileState(step.id).concat(selected);
            value.files = state.files[step.id];
            fileInput.value = '';
            renderFileList(step, listEl);
            clearError();
        });
        fileLabel.appendChild(fileInput);

        const note = document.createElement('p');
        note.className = 'briefing-file-note';
        note.textContent = 'Nesta etapa os arquivos ficam apenas listados no navegador. O upload real para Google Drive será conectado futuramente via Apps Script.';

        const listEl = document.createElement('div');
        listEl.className = 'briefing-file-list';
        renderFileList(step, listEl);

        block.appendChild(fileLabel);
        block.appendChild(note);
        block.appendChild(listEl);
        elements.fieldContainer.appendChild(block);
    }

    function createDateOrText(step) {
        const value = getCompositeValue(step.id);
        const block = document.createElement('div');
        block.className = 'briefing-date-block';
        block.setAttribute('data-briefing-field', step.id);

        const dateId = `field-${step.id}-date`;
        const dateLabel = document.createElement('label');
        dateLabel.className = 'briefing-sr-only';
        dateLabel.setAttribute('for', dateId);
        dateLabel.textContent = 'Data desejada';
        const dateInput = document.createElement('input');
        dateInput.id = dateId;
        dateInput.type = 'date';
        dateInput.className = 'briefing-date-input';
        dateInput.value = value.date || '';
        dateInput.setAttribute('aria-describedby', 'field-error');
        dateInput.addEventListener('input', () => {
            value.date = dateInput.value;
            clearError();
        });

        const textId = `field-${step.id}-text`;
        const textLabel = document.createElement('label');
        textLabel.className = 'briefing-sr-only';
        textLabel.setAttribute('for', textId);
        textLabel.textContent = step.question;
        const input = document.createElement('input');
        input.id = textId;
        input.type = 'text';
        input.className = 'briefing-input';
        input.placeholder = step.placeholder || '';
        input.value = value.text || '';
        input.setAttribute('aria-describedby', 'field-error');
        input.addEventListener('input', () => {
            value.text = input.value;
            clearError();
        });

        block.appendChild(dateLabel);
        block.appendChild(dateInput);
        block.appendChild(textLabel);
        block.appendChild(input);
        elements.fieldContainer.appendChild(block);
    }

    function renderField(step) {
        elements.fieldContainer.innerHTML = '';

        if (['text', 'tel', 'email', 'url'].includes(step.type)) {
            createInput(step, step.type);
            return;
        }

        if (step.type === 'textarea') {
            createTextarea(step);
            return;
        }

        if (step.type === 'single_select') {
            createOptions(step, false);
            return;
        }

        if (step.type === 'multi_select') {
            createOptions(step, true);
            return;
        }

        if (step.type === 'file_or_link') {
            createFileOrLink(step, 'link');
            return;
        }

        if (step.type === 'file_or_text') {
            createFileOrLink(step, 'text');
            return;
        }

        if (step.type === 'date_or_text') {
            createDateOrText(step);
            return;
        }

        if (step.type === 'checkbox') {
            createOptions(step, true);
        }
    }

    function focusPrimaryField(preferOther) {
        window.setTimeout(() => {
            const selector = preferOther
                ? '[data-briefing-field$="_other"], input, textarea, button'
                : 'input:not([type="hidden"]), textarea, button';
            const field = elements.fieldContainer.querySelector(selector);
            if (field && typeof field.focus === 'function') field.focus();
        }, 80);
    }

    function renderStep(options = {}) {
        const step = getCurrentStep();
        if (!step) return;
        const visibleSteps = getVisibleSteps();
        const isLast = state.currentIndex === visibleSteps.length - 1;

        elements.sectionTitle.textContent = step.sectionTitle;
        elements.stepCounter.textContent = `Etapa ${pad(state.currentIndex + 1)} de ${pad(visibleSteps.length)}`;
        elements.stepQuestion.textContent = step.question;
        elements.stepHelp.textContent = step.help || '';
        elements.nextBtn.querySelector('span').textContent = isLast ? 'Revisar briefing' : 'Próximo';
        elements.backBtn.disabled = state.currentIndex === 0;

        clearError();
        renderField(step);
        updateProgress('form');

        if (!options.keepScroll) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        focusPrimaryField(options.focusOther);
    }

    function isEmptyValue(step) {
        const value = state.answers[step.id];

        if (['single_select', 'text', 'tel', 'email', 'url', 'textarea'].includes(step.type)) {
            return !hasText(value);
        }

        if (step.type === 'multi_select' || step.type === 'checkbox') {
            return !Array.isArray(value) || value.length === 0;
        }

        if (step.type === 'file_or_link') {
            const composite = value || {};
            return !hasText(composite.links) && getFileState(step.id).length === 0;
        }

        if (step.type === 'file_or_text') {
            const composite = value || {};
            return !hasText(composite.text) && getFileState(step.id).length === 0;
        }

        if (step.type === 'date_or_text') {
            const composite = value || {};
            return !hasText(composite.date) && !hasText(composite.text);
        }

        return false;
    }

    function isValidEmail(value) {
        const email = String(value || '').trim().toLowerCase();
        if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(email)) {
            return false;
        }
        const parts = email.split('@');
        if (parts.length !== 2) return false;
        const [localPart, domain] = parts;
        if (!localPart || !domain || localPart.length > 64 || email.length > 254) return false;
        if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) return false;

        const labels = domain.split('.');
        const tld = labels[labels.length - 1];
        if (!/^[a-z]{2,}$/i.test(tld)) return false;

        return labels.every((label) =>
            label.length > 0 &&
            label.length <= 63 &&
            !label.startsWith('-') &&
            !label.endsWith('-')
        );
    }

    function isValidPhone(value) {
        const digits = String(value || '').replace(/\D/g, '');
        return /^[1-9]{2}9\d{8}$/.test(digits);
    }

    function formatPhoneBR(value) {
        const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
        const ddd = digits.slice(0, 2);
        const firstPart = digits.slice(2, 7);
        const secondPart = digits.slice(7, 11);

        if (digits.length <= 2) return ddd ? `(${ddd}` : '';
        if (digits.length <= 7) return `(${ddd})-${firstPart}`;
        return `(${ddd})-${firstPart}-${secondPart}`;
    }

    function normalizeUrl(value) {
        const trimmed = String(value || '').trim();
        if (!trimmed) return '';
        return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    }

    function isValidUrl(value) {
        try {
            const url = new URL(normalizeUrl(value));
            return Boolean(url.hostname && url.hostname.includes('.'));
        } catch (e) {
            return false;
        }
    }

    function validateLinksText(value) {
        if (!hasText(value)) return true;
        return String(value)
            .split(/\n+/)
            .map((item) => item.trim())
            .filter(Boolean)
            .every(isValidUrl);
    }

    function validateStep(step) {
        if (step.required && isEmptyValue(step)) {
            return ERROR_COPY.required;
        }

        const value = state.answers[step.id];

        if (step.type === 'email' && hasText(value) && !isValidEmail(value)) {
            return ERROR_COPY.invalidEmail;
        }

        if (step.type === 'tel' && hasText(value) && !isValidPhone(value)) {
            return ERROR_COPY.invalidPhone;
        }

        if (step.type === 'url' && hasText(value) && !isValidUrl(value)) {
            return ERROR_COPY.invalidUrl;
        }

        if (step.type === 'textarea' && step.minLength && hasText(value) && String(value).trim().length < step.minLength) {
            return ERROR_COPY.minLength;
        }

        if (step.type === 'multi_select' && step.maxSelection && Array.isArray(value) && value.length > step.maxSelection) {
            return `Selecione no máximo ${step.maxSelection} opções.`;
        }

        if (step.conditionalField && value === step.conditionalField.showWhen && !hasText(state.answers[`${step.id}_other`])) {
            return ERROR_COPY.otherRequired;
        }

        if (step.type === 'file_or_link') {
            const composite = value || {};
            if (!validateLinksText(composite.links)) return ERROR_COPY.invalidUrl;
        }

        return '';
    }

    function goNext() {
        const step = getCurrentStep();
        const error = validateStep(step);
        if (error) {
            setError(error);
            focusPrimaryField();
            return;
        }

        const visibleSteps = getVisibleSteps();
        if (state.currentIndex >= visibleSteps.length - 1) {
            renderReview();
            return;
        }

        state.currentIndex += 1;
        renderStep();
    }

    function goBack() {
        if (state.currentIndex <= 0) return;
        state.currentIndex -= 1;
        renderStep();
    }

    function formatValue(value) {
        if (Array.isArray(value)) {
            return value.length ? value.join(', ') : 'Não informado';
        }

        if (value && typeof value === 'object') {
            const parts = [];
            if (value.date) parts.push(`Data: ${value.date}`);
            if (value.text) parts.push(value.text);
            if (value.links) parts.push(value.links);
            if (value.files && value.files.length) {
                parts.push(`Arquivos: ${value.files.map((file) => file.name).join(', ')}`);
            }
            return parts.length ? parts.join('\n') : 'Não informado';
        }

        return hasText(value) ? String(value) : 'Não informado';
    }

    function getAnswerForReview(id) {
        const value = state.answers[id];
        const otherValue = state.answers[`${id}_other`];
        if (otherValue) {
            return `${formatValue(value)}: ${otherValue}`;
        }
        return formatValue(value);
    }

    function renderReview() {
        elements.reviewSummary.innerHTML = '';

        REVIEW_GROUPS.forEach((group) => {
            const item = document.createElement('article');
            item.className = 'briefing-review-item';

            const label = document.createElement('p');
            label.className = 'briefing-review-label';
            label.textContent = group.label;

            const value = document.createElement('p');
            value.className = 'briefing-review-value';
            value.textContent = group.ids
                .map((id) => getAnswerForReview(id))
                .filter((line) => line !== 'Não informado')
                .join('\n') || 'Não informado';

            item.appendChild(label);
            item.appendChild(value);
            elements.reviewSummary.appendChild(item);
        });

        elements.submitStatus.textContent = '';
        elements.submitStatus.classList.remove('is-error');
        updateProgress('review');
        showScreen('reviewScreen');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.setTimeout(() => elements.submitBtn.focus(), 120);
    }

    function copyFileState(id) {
        return getFileState(id).map((file) => ({ ...file }));
    }

    function fileLinkValue(id) {
        const value = state.answers[id] || {};
        return {
            links: value.links || '',
            files: copyFileState(id)
        };
    }

    function fileTextValue(id) {
        const value = state.answers[id] || {};
        return {
            text: value.text || '',
            files: copyFileState(id)
        };
    }

    function answer(id) {
        return state.answers[id] || '';
    }

    function buildPayload() {
        return {
            metadata: {
                submittedAt: new Date().toISOString(),
                formType: 'landing-page-briefing',
                source: 'futura-design-website'
            },
            client: {
                name: answer('client_name'),
                companyName: answer('company_name'),
                whatsapp: answer('whatsapp'),
                email: answer('email'),
                channels: answer('current_channels'),
                serviceRegion: answer('service_region')
            },
            project: {
                goal: answer('landing_goal') === 'Outro' ? answer('landing_goal_other') : answer('landing_goal'),
                primaryAction: answer('primary_action') === 'Outro' ? answer('primary_action_other') : answer('primary_action'),
                trafficSource: answer('traffic_source')
            },
            offer: {
                name: answer('offer_name'),
                description: answer('offer_description'),
                problemSolved: answer('problem_solved'),
                benefits: answer('main_benefits'),
                differentials: answer('differentials'),
                priceConditions: answer('price_conditions'),
                paymentMethods: answer('payment_methods'),
                guaranteeRefund: answer('guarantee_refund')
            },
            audience: {
                profile: answer('target_audience'),
                location: answer('audience_location'),
                pains: answer('audience_pains'),
                objections: answer('audience_objections')
            },
            branding: {
                hasLogo: answer('has_logo'),
                logo: fileLinkValue('logo_upload'),
                colors: answer('brand_colors'),
                manual: fileLinkValue('brand_manual'),
                desiredStyle: answer('desired_visual_style'),
                avoidStyle: answer('avoid_visual_style')
            },
            materials: {
                images: fileLinkValue('product_images'),
                videos: fileLinkValue('videos_materials'),
                references: answer('visual_references'),
                referenceReason: answer('reference_reason')
            },
            authority: {
                testimonials: fileTextValue('testimonials'),
                reviews: fileLinkValue('reviews'),
                numbers: answer('authority_numbers'),
                certificatesPartners: answer('certificates_partners'),
                beforeAfter: fileLinkValue('before_after')
            },
            conversion: {
                whatsapp: answer('page_whatsapp'),
                whatsappMessage: answer('whatsapp_message'),
                checkoutLink: answer('checkout_link'),
                schedulingLink: answer('scheduling_link'),
                leadFormRequired: answer('lead_form_required'),
                leadFormFields: answer('lead_form_fields'),
                leadDestination: answer('lead_destination')
            },
            publication: {
                hasDomain: answer('has_domain'),
                domain: answer('domain_address'),
                hostingPlatform: answer('hosting_platform'),
                integrationType: answer('existing_site_integration'),
                launchDate: answer('launch_date')
            },
            measurement: {
                paidTraffic: answer('paid_traffic'),
                advertisingPlatforms: answer('advertising_platforms'),
                trackingTools: answer('tracking_tools'),
                conversionEvents: answer('conversion_events')
            },
            seo: {
                title: answer('seo_title'),
                keywords: answer('seo_keywords'),
                sharingImage: fileLinkValue('sharing_image')
            },
            legalApproval: {
                privacyTerms: fileLinkValue('privacy_terms'),
                regulatedSegment: answer('regulated_segment'),
                approvalContact: answer('approval_contact'),
                additionalInformation: answer('additional_information'),
                consent: Array.isArray(answer('consent')) && answer('consent').length > 0
            }
        };
    }

    async function submitBriefing(payload) {
        // Conecte aqui a URL real do Web App do Google Apps Script quando a integração estiver publicada.
        if (!APPS_SCRIPT_WEB_APP_URL) {
            const error = new Error('Apps Script endpoint not configured');
            error.userMessage = 'A integração com Google Apps Script ainda não está configurada. Nenhum dado foi enviado. Quando a URL real estiver disponível, conecte-a na constante APPS_SCRIPT_WEB_APP_URL.';
            throw error;
        }

        const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = new Error('Submission failed');
            error.userMessage = 'Não foi possível enviar o briefing agora. Verifique a integração e tente novamente.';
            throw error;
        }

        return response;
    }

    async function handleSubmit() {
        const payload = buildPayload();
        state.submitState = 'loading';
        elements.submitBtn.disabled = true;
        elements.submitBtn.querySelector('span').textContent = 'Enviando...';
        elements.submitStatus.textContent = 'Preparando envio do briefing...';
        elements.submitStatus.classList.remove('is-error');

        try {
            await submitBriefing(payload);
            state.submitState = 'success';
            updateProgress('success');
            showScreen('successScreen');
            window.setTimeout(() => document.querySelector('#success-screen a')?.focus(), 120);
        } catch (error) {
            state.submitState = 'error';
            elements.submitStatus.textContent = error.userMessage || 'Não foi possível enviar o briefing agora.';
            elements.submitStatus.classList.add('is-error');
        } finally {
            elements.submitBtn.disabled = false;
            elements.submitBtn.querySelector('span').textContent = 'Enviar briefing';
        }
    }

    function bindElements() {
        elements.introScreen = byId('intro-screen');
        elements.formScreen = byId('form-screen');
        elements.reviewScreen = byId('review-screen');
        elements.successScreen = byId('success-screen');
        elements.progressText = byId('progress-text');
        elements.progressBar = byId('progress-bar');
        elements.startBtn = byId('start-btn');
        elements.form = byId('briefing-form');
        elements.sectionTitle = byId('section-title');
        elements.stepCounter = byId('step-counter');
        elements.stepQuestion = byId('step-question');
        elements.stepHelp = byId('step-help');
        elements.fieldContainer = byId('field-container');
        elements.fieldError = byId('field-error');
        elements.backBtn = byId('back-btn');
        elements.nextBtn = byId('next-btn');
        elements.reviewBackBtn = byId('review-back-btn');
        elements.reviewSummary = byId('review-summary');
        elements.submitBtn = byId('submit-btn');
        elements.submitStatus = byId('submit-status');
    }

    function init() {
        bindElements();
        updateLogo();
        updateProgress('intro');

        elements.startBtn.addEventListener('click', () => {
            state.currentIndex = 0;
            showScreen('formScreen');
            renderStep();
        });

        elements.form.addEventListener('submit', (event) => {
            event.preventDefault();
            goNext();
        });

        elements.backBtn.addEventListener('click', goBack);

        elements.reviewBackBtn.addEventListener('click', () => {
            showScreen('formScreen');
            renderStep();
        });

        elements.submitBtn.addEventListener('click', handleSubmit);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }

    window.FuturaLandingBriefing = {
        buildPayload,
        submitBriefing,
        getVisibleSteps,
        state
    };
})();
