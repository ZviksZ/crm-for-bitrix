export const projectsData = {
   data: {
      clients: [
         {
            id: '1',
            title: 'МигКредит',
            budget: '23000000',
            expenses: '8700',
            expensesPeriod: '5300',
            rest: '12300',
            cost: '5300',
            paid: '5300',
            profit: '5300',
            profitPercent: '16',
            projects: [
               {
                  id: '1234',
                  title: 'Продвижение мигкредит',
                  budget: '23000000',
                  expenses: '8700',
                  expensesPeriod: '5300',
                  rest: '12300',
                  status: '1',
                  cost: '5300',
                  paid: '5300',
                  profit: '5300',
                  profitPercent: '16',
                  tasks: [
                     {
                        id: '13',
                        title: 'RFC-190127 Обновление каталога',
                        expenses: '8700',
                        expensesPeriod: '5300',
                        status: '1',
                        link: '#url1'
                     }
                  ],
                  transactions: [
                     {
                        id: '14',
                        title: 'Аренда',
                        expenses: '8700',
                        expensesPeriod: '5300'
                     }
                  ],
                  indirect:  {
                     expenses: '8700',
                     expensesPeriod: '5300'
                  }
               }
            ]
         },
         {
            id: '123',
            title: 'МигКредит2',
            budget: '23000000',
            expenses: '8700',
            expensesPeriod: '5300',
            rest: '12300',
            cost: '5300',
            paid: '5300',
            profit: '5300',
            profitPercent: '16',
            projects: [
               {
                  id: '12345',
                  title: 'Продвижение мигкредит2',
                  budget: '3000000',
                  expenses: '8700',
                  expensesPeriod: '5300',
                  rest: '12300',
                  status: '1',
                  cost: '5300',
                  paid: '5300',
                  profit: '5300',
                  profitPercent: '16',
                  tasks: [
                     {
                        id: '1345',
                        title: 'RFC-190127 Обновление каталога',
                        expenses: '8700',
                        expensesPeriod: '5300',
                        status: '1',
                        link: '#url1'
                     }
                  ],
                  transactions: [
                     {
                        id: '1456',
                        title: 'Аренда',
                        expenses: '8700',
                        expensesPeriod: '5300'
                     }
                  ],
                  indirect:  {
                     expenses: '8700',
                     expensesPeriod: '5300'
                  }
               }
            ]
         },
      ]
   }
}


export const membersData = {
   data: {
      members: [
         {
            id: '1',
            title: 'Иван Иванов',
            plan: '160',
            time: '150',
            timeFact: '100',
            payment: '500',
            projects: [
               {
                  id: '11',
                  title: 'Продвижение РПЛ',
                  client: 'РПЛ',
                  clientId: '1',
                  plan: '160',
                  time: '150',
                  timeFact: '100',
                  payment: '500',
                  tasks: [
                     {
                        id:'111',
                        title: 'RFC-190127 Обновление каталога',
                        link: 'url1',
                        plan: '160',
                        time: '150',
                        timeFact: '100',
                        payment: '500'
                     }
                  ]
               },
               {
                  id: '22',
                  title: 'Техподдержска мигкрдит 2020',
                  client: 'мигкредит',
                  clientId: '2',
                  plan: '160',
                  time: '150',
                  timeFact: '100',
                  payment: '500',
                  tasks: [
                     {
                        id:'111',
                        title: 'RFC-190127 Обновление каталога',
                        link: 'url1',
                        plan: '160',
                        time: '150',
                        timeFact: '100',
                        payment: '500'
                     }
                  ]
               },
            ]
         },
         {
            id: '2',
            title: 'Петр Петров',
            plan: '170',
            time: '152',
            timeFact: '100',
            payment: '600',
            projects: [
               {
                  id: '11',
                  title: 'Продвижение РПЛ',
                  client: 'РПЛ',
                  clientId: '1',
                  plan: '160',
                  time: '150',
                  timeFact: '100',
                  payment: '500',
                  tasks: [
                     {
                        id:'111',
                        title: 'RFC-190127 Обновление каталога',
                        link: 'url1',
                        plan: '160',
                        time: '150',
                        timeFact: '100',
                        payment: '500'
                     }
                  ]
               },
               {
                  id: '22',
                  title: 'Техподдержска мигкрдит 2020',
                  client: 'мигкредит',
                  clientId: '2',
                  plan: '160',
                  time: '150',
                  timeFact: '100',
                  payment: '500',
                  tasks: [
                     {
                        id:'111',
                        title: 'RFC-190127 Обновление каталога',
                        link: 'url1',
                        plan: '160',
                        time: '150',
                        timeFact: '100',
                        payment: '500'
                     }
                  ]
               },
            ]
         }
      ]
   }
}


export const awardsData = {
   data: {
      awards: [
         {
            id: '1',
            title: 'Иван Иванов',
            projects: [
               {
                  id: '11',
                  title: 'Продвижение РПЛ',
                  client: 'РПЛ',
                  clientId: '1',
                  budget: '13000',
                  expenses: '14000',
                  share: '5000',
                  rest: '2000',
                  sharePercent: '26.32',
                  award: '32',
                  awardAdditional: '2000',
                  payoff: '2000',
               },
               {
                  id: '12',
                  title: 'Продвижение РПЛ 2',
                  client: 'Мигкредит',
                  clientId: '2',
                  budget: '16000',
                  expenses: '14000',
                  share: '5000',
                  rest: '2000',
                  sharePercent: '26.32',
                  award: '56',
                  awardAdditional: '2000',
                  payoff: '2000',
               },
               {
                  id: '1134',
                  title: 'Продвижение РПЛ',
                  client: 'РПЛ',
                  clientId: '1',
                  budget: '13000',
                  expenses: '14000',
                  share: '5000',
                  rest: '2000',
                  sharePercent: '26.32',
                  award: '7',
                  awardAdditional: '2000',
                  payoff: '2000',
               },
               {
                  id: '124',
                  title: 'Продвижение РПЛ 2',
                  client: 'Мигкредит',
                  clientId: '2',
                  budget: '5',
                  expenses: '14000',
                  share: '5000',
                  rest: '2000',
                  sharePercent: '26.32',
                  award: '777',
                  awardAdditional: '2000',
                  payoff: '2000',
               },
            ]
         },
         {
            id: '2',
            title: 'Петр Петров',
            projects: [
               {
                  id: '13',
                  title: 'Продвижение РПЛ',
                  client: 'РПЛ 3',
                  clientId: '6',
                  budget: '16000',
                  expenses: '14000',
                  share: '5000',
                  rest: '2000',
                  sharePercent: '26.32',
                  award: '777',
                  awardAdditional: '2000',
                  payoff: '2000',
               },
               {
                  id: '14',
                  title: 'Продвижение РПЛ 2',
                  client: 'Мигкредит',
                  clientId: '2',
                  budget: '16000',
                  expenses: '14000',
                  share: '5000',
                  rest: '2000',
                  sharePercent: '26.32',
                  award: '777',
                  awardAdditional: '2000',
                  payoff: '2000',
               },
            ]
         },
      ]
   }
}
