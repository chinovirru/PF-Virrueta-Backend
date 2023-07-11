export class MongooseManager {
    #db

    constructor(db) {
        this.#db = db
    }

    async findAll(searchCriterial, optionsPagination) {
        return await this.#db.paginate(searchCriterial, optionsPagination, (error, result) => {
            if (error) {
                return error
            }

            const {docs, totalDocs, pagingCounter, ...retVal} = result

            return {
                ...retVal,
                status: 'success',
                prevLink: retVal.hasPrevPage && retVal.prevPage,
                nextLink: retVal.hasNextPage && retVal.nextPage,
                payload: result.docs,
            }

        })
    }

    async findById(id) {
        return await this.#db.findOne({_id: id})
    }

    async create(element) {
        return await this.#db.create(element)
    }

    async deleteById(id) {
        await this.#db.deleteOne({_id: id})
    }

    async update(id, element) {
        await this.#db.updateOne({_id: id}, {$set: element})
        return this.findById(id)
    }

    async findByIdWithPopulate(id, populate) {
        return await this.#db.findOne({_id: id}).populate(populate)
    }
}