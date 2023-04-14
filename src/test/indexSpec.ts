import app from '..';
import supertest from 'supertest';
const request = supertest(app);

describe('testing accessing different routes', () => {
  it('Sending a request to a non existing routes', async (): Promise<void> => {
    const response = await request.get('/api/wrong');
    expect(response.status).toEqual(404);
  });
});

describe('testing validateRequest responses', () => {
  it('sending a request with no filename', async (): Promise<void> => {
    const response = await request.get('/api/images?width=100&height=100');
    expect(response.status).toEqual(400);
  });

  it('sending a request with no width', async (): Promise<void> => {
    const response = await request.get(
      '/api/images?filename=encenadaport&height=100'
    );
    expect(response.status).toEqual(400);
  });
  it('sending a request with no height', async (): Promise<void> => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=100'
    );
    expect(response.status).toEqual(400);
  });
  it('sending a request with a wrong filename', async (): Promise<void> => {
    const response = await request.get(
      '/api/images?filename=wrongFilename&width=100&height=100'
    );
    expect(response.status).toEqual(400);
  });
  it('sending a request with a none numerical value for width', async (): Promise<void> => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=nonNumericalValue&height=100'
    );
    expect(response.status).toEqual(400);
  });
  it('sending a request with a none numerical value for height', async (): Promise<void> => {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=100&height=nonNumericalValue'
    );
    expect(response.status).toEqual(400);
  });
});
