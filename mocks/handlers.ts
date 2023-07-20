import { rest } from 'msw'


export const handlers = [
  rest.get('/api/personnel', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          personnel_id: 1,
          personnel_email: 'hello@gmail.come',
          personnel_visit_type: 'Virtual',
          personnel_image: 'helllllll.com',
          personnel_description: 'yes',
          personnel_jobtype: 'Doctor',
          personnel_fullname: 'Mary T',
          personnel_position: 'MD',
          created_at: '2023-07-19T13:57:03.108Z',
          updated_at: '2023-07-19T13:57:03.108Z',
        },
      ])
    )
  }),

  rest.post('/api/appointment', (req, res, ctx) => {
    return res(ctx.json({}))
  }),
]
