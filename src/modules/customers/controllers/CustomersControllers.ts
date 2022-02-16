import { Request, Response, NextFunction } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const listCustomers = new ListCustomerService();

      const customers = await listCustomers.execute();

      return response.json(customers);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const showCostumer = new ShowCustomerService();

      const costumer = await showCostumer.execute({ id });

      return response.json(costumer);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { name, email } = request.body;

      const createCostumer = new CreateCustomerService();

      const customer = await createCostumer.execute({
        name,
        email,
      });

      return response.json(customer);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { name, email } = request.body;
      const { id } = request.params;

      const updateCustomer = new UpdateCustomerService();

      const customer = await updateCustomer.execute({
        id,
        name,
        email,
      });

      return response.json(customer);
    } catch (err) {
      next(err);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { id } = request.params;

      const deleteCustomer = new DeleteCustomerService();

      await deleteCustomer.execute({ id });

      return response.json([]);
    } catch (err) {
      next(err);
    }
  }
}
