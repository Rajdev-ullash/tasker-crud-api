import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import slugify from 'slugify';
import supertest from 'supertest';
import createServer from '../../utils/createServer';
import { TaskService } from '../modules/tasks/tasks.service';

const app = createServer();

const taskPayload = {
  title: 'rajus',
  description: 'task 1 description',
  isFavorite: false,
  status: 'pen',
};

describe('task', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe('get task route', () => {
    describe('given the task not found', () => {
      it('should return 404', async () => {
        const taskId = 'task-123';
        await supertest(app).get(`/task/single-task/${taskId}`).expect(404);
      });
    });
    describe('given the task found', () => {
      it('should return 200', async () => {
        const task = await TaskService.createTask(taskPayload as any);
        const { body, statusCode } = await supertest(app).get(
          `/api/v1/task/single-task/${task?.slug}`,
        );
        expect(statusCode).toBe(200);
        expect(body.data.title).toBe(task?.title);
      });
    });
  });

  describe('create task route', () => {
    describe('create task route', () => {
      it('it should return 200 and create task', async () => {
        const taskTitle = taskPayload.title;
        const baseSlug = slugify(taskTitle, { lower: true });
        const { statusCode, body } = await supertest(app)
          .post('/api/v1/task/create-task')
          .send(taskPayload);
        expect(statusCode).toBe(200);
        expect(body.data).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description: 'task 1 description',
          id: expect.any(String),
          isFavorite: false,
          slug: expect.stringMatching(new RegExp(`^${baseSlug}(?:-\\d+)?$`)),
          status: 'pen',
          title: 'rajus',
          updatedAt: expect.any(String),
        });
      });
    });
  });
});
