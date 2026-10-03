<h3>TypeScript 6 & Modern Strict Typing</h3>
		<p class="text-base sm:text-lg">
			TypeScript 6 provides sound type inference, const type parameters, the <code>satisfies</code> operator,
			and strict discriminated unions.
		</p>
		<ul>
			<li>
				<strong>The <code>satisfies</code> Operator:</strong> Enforces that an expression matches an interface
				without widening literal string or numeric types to general primitives.
			</li>
			<li>
				<strong>Const Type Parameters:</strong> Allows generic functions to infer literal tuple and
				object types automatically at the call site without requiring <code>as const</code>.
			</li>
			<li>
				<strong>Discriminated Unions & Exhaustiveness:</strong> Guarantees that all variants of an event
				or state machine are handled safely at compile time.
			</li>
		</ul>
