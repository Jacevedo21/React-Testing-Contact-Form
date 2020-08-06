import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import 'mutationobserver-shim'
import ContactForm from './ContactForm'
import { act } from 'react-dom/test-utils'

test('Renders form without errors', () => {
    render(<ContactForm />)
})

test('Adds contact information', async () => {
    // render the contact info
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)

    await act(async() => {
        fireEvent.change(firstNameInput, { target: { value: "yas"} })
        fireEvent.change(lastNameInput, { target: { value: "booga"} })
        fireEvent.change(emailInput, { target: { value: "testing2@test.com"} })
        fireEvent.change(messageInput, { target: { value: "some secret message"} })

        const submitBtn = screen.getByRole('button', {name: /submit/i })
        fireEvent.click(submitBtn)
    })
    
    expect(screen.getByText(/yas/i)).toBeInTheDocument()
    expect(screen.getByText(/booga/i)).toBeInTheDocument()
    expect(screen.getByText(/testing2@test.com/i)).toBeInTheDocument()
    expect(screen.getByText(/some secret message/i)).toBeInTheDocument()

})