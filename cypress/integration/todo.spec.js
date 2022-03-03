describe('To-do app', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('displays three todo items by default', () => {
      cy.get('.todo-list li').should('have.length', 3)

      cy.get('.todo-list li')
        .first()
        .should('contain', 'Eat')

      cy.contains('Sleep').should('exist')

      cy.get('.todo-list li').should('contain','Sleep')

      cy.get('.todo-list li')
        .last()
        .should('contain', 'Repeat')
    })
  
    it('can add new todo items', () => {
      const newItem = 'Code'
  
      cy.get('[data-test=new-todo]').type(`${newItem}`)
      cy.get('[data-test=addButton]').click()
  
      cy.get('.todo-list li')
        .should('have.length', 4)
        .last()
        .should('contain', 'Code')
    })

    it('can check off an item as completed', () => {
      cy.contains('Eat')
        .parent()
        .find('input[type=checkbox]')
        .check()
    
      cy.contains('Eat')
        .parents('li')
        .should('have.class', 'completed')
    })

    it('can show the number of total tasks', () => {
      cy.contains('All').click()

      cy.get('.todo-count').should('contain',3)
    })

    it('can filter for total tasks', () => {
      cy.contains('All').click()

      cy.get('.todo-list li').should('have.length', 3)

      cy.get('.todo-list li')
        .first()
        .should('contain', 'Eat')

      cy.contains('Sleep').should('exist')

      cy.get('.todo-list li')
        .last()
        .should('contain', 'Repeat')
    })

    it('can edit todo item', () => {
      cy.get('.todo-list li').first()
      cy.contains('Edit').click()

      const newItem = 'Walk'
      cy.get('.todo-text').type(`${newItem}{enter}`)
    
      cy.get('.todo-list li')
        .should('have.length', 3)
        .should('not.have.text', 'Eat')
        .should('contain','Walk')
    })

    it('can delete todo item', () => {
      cy.get('.todo-list li').first()
      cy.contains('Delete').click()
  
      cy.get('.todo-list li')
        .should('have.length', 2)
        .should('not.contain', 'Eat')
    })
  
    context('with a checked task', () => {
      beforeEach(() => {
        cy.contains('Eat')
          .parent()
          .find('input[type=checkbox]')
          .check()
      })

      it('can show the number of active tasks', () => {
        cy.contains('Active').click()

        cy.get('.todo-count').should('contain',2)
      })
  
      it('can filter for uncompleted tasks', () => {
        cy.contains('Active').click()

        cy.get('.todo-list li').should('have.length', 2)
  
        cy.get('.todo-list li')
          .first()
          .should('contain', 'Sleep')

        cy.get('.todo-list li')
          .last()
          .should('contain', 'Repeat')
  
        cy.contains('Eat').should('not.exist')
      })

      it('can show the number of completed tasks', () => {
        cy.contains('Completed').click()

        cy.get('.todo-count').should('contain',1)
      })
  
      it('can filter for completed tasks', () => {
        cy.contains('Completed').click()

        cy.get('.todo-list li').should('have.length', 1)
  
        cy.get('.todo-list li')
          .first()
          .should('contain', 'Eat')
  
        cy.contains('Sleep').should('not.exist')

        cy.contains('Repeat').should('not.exist')
      })
    })
  })  